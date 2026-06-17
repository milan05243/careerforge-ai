import re
from pypdf import PdfReader
from io import BytesIO

# Standard skills dataset grouped by domain
SKILLS_DB = {
    "Frontend": [
        "react", "react.js", "javascript", "js", "html", "css", "html5", "css3", "typescript", "ts",
        "tailwind", "tailwindcss", "bootstrap", "sass", "webpack", "vite", "next.js", "nextjs", 
        "vue", "vuejs", "angular", "redux", "graphql", "dom", "responsive design", "es6"
    ],
    "Backend": [
        "python", "java", "node.js", "nodejs", "express", "django", "flask", "fastapi", "golang", "go",
        "spring boot", "spring", "c#", "net", "asp.net", "ruby", "rails", "php", "rest", "rest api",
        "restful", "grpc", "graphql", "microservices", "mvc", "oops"
    ],
    "Database": [
        "sql", "mysql", "postgresql", "postgres", "sqlite", "mongodb", "redis", "dynamodb", "cassandra",
        "oracle", "mssql", "mariadb", "nosql", "firebase", "firestore"
    ],
    "DevOps & Cloud": [
        "aws", "azure", "gcp", "docker", "kubernetes", "k8s", "cicd", "ci/cd", "jenkins", "git", 
        "github", "gitlab", "terraform", "ansible", "linux", "bash", "nginx", "prometheus", "grafana"
    ],
    "Data Science & AI": [
        "pandas", "numpy", "scikit-learn", "sklearn", "tensorflow", "pytorch", "keras", "matplotlib",
        "seaborn", "nlp", "machine learning", "ml", "deep learning", "dl", "computer vision", "cv",
        "r", "julia", "tableau", "powerbi", "jupyter"
    ],
    "General / Soft Skills": [
        "agile", "scrum", "communication", "leadership", "problem solving", "teamwork", "collaboration",
        "analytical", "critical thinking", "management", "star method"
    ]
}

# Industry standard sections to check in the resume
REQUIRED_SECTIONS = {
    "contact": [r"contact", r"email", r"phone", r"address", r"linkedin", r"github"],
    "experience": [r"experience", r"employment", r"work history", r"professional history"],
    "education": [r"education", r"academic", r"university", r"college", r"degree"],
    "skills": [r"skills", r"technical skills", r"technologies", r"core competencies"],
    "projects": [r"projects", r"academic projects", r"personal projects", r"key projects"],
}

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Extracts text from PDF bytes. Falls back to string decoding if corrupt."""
    try:
        reader = PdfReader(BytesIO(pdf_bytes))
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text
    except Exception as e:
        # Fallback to general UTF-8 string decoding of readable chunks
        try:
            return pdf_bytes.decode('utf-8', errors='ignore')
        except:
            return ""

def analyze_resume_ats(pdf_bytes: bytes, target_role: str = "Fullstack") -> dict:
    """Analyzes resume text and generates ATS matching scores, skill matches, gaps, and improvements."""
    text = extract_text_from_pdf(pdf_bytes)
    lower_text = text.lower()
    
    if not text.strip() or len(text) < 100:
        return {
            "ats_score": 15,
            "extracted_skills": [],
            "missing_skills": ["No readable text found in upload. Ensure it is a valid text-based PDF."],
            "suggestions": ["Upload a non-scanned PDF containing selectable text.", "Add standard sections like Experience and Skills."]
        }
    
    # 1. Structure Score (Max 30)
    structure_score = 0
    detected_sections = []
    missing_sections = []
    
    for section, regexes in REQUIRED_SECTIONS.items():
        found = False
        for regex in regexes:
            if re.search(regex, lower_text):
                found = True
                break
        if found:
            structure_score += 6
            detected_sections.append(section.capitalize())
        else:
            missing_sections.append(section.capitalize())

    # 2. Formatting & Contact Checklist (Max 30)
    formatting_score = 0
    suggestions = []
    
    # Check email
    has_email = re.search(r"[\w\.-]+@[\w\.-]+\.\w+", lower_text)
    if has_email:
        formatting_score += 10
    else:
        suggestions.append("Missing email address. Ensure your contact details are complete.")

    # Check phone
    has_phone = re.search(r"\+?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}", lower_text)
    if has_phone:
        formatting_score += 10
    else:
        suggestions.append("Missing phone number or phone contact details.")

    # Check GitHub / LinkedIn / Portfolio
    has_links = "linkedin.com" in lower_text or "github.com" in lower_text
    if has_links:
        formatting_score += 10
    else:
        suggestions.append("Include links to your GitHub profile and LinkedIn to showcase your code and network.")

    # 3. Skill Matching Score (Max 40)
    extracted_skills = []
    for category, skills in SKILLS_DB.items():
        for skill in skills:
            # Word boundary check for skill
            pattern = r"\b" + re.escape(skill) + r"\b"
            if re.search(pattern, lower_text):
                # Clean name for presentation
                clean_skill = skill.upper() if len(skill) <= 3 else skill.title()
                if clean_skill not in extracted_skills:
                    extracted_skills.append(clean_skill)
    
    # Target profile required skills mapping
    role_skills_map = {
        "Frontend": SKILLS_DB["Frontend"] + SKILLS_DB["General / Soft Skills"][:4],
        "Backend": SKILLS_DB["Backend"] + SKILLS_DB["Database"] + SKILLS_DB["General / Soft Skills"][:4],
        "Fullstack": SKILLS_DB["Frontend"] + SKILLS_DB["Backend"] + SKILLS_DB["Database"],
        "Data Science": SKILLS_DB["Data Science & AI"] + SKILLS_DB["Database"] + SKILLS_DB["Backend"][:3],
        "DevOps": SKILLS_DB["DevOps & Cloud"] + SKILLS_DB["Backend"][:3]
    }
    
    target_skills = role_skills_map.get(target_role, role_skills_map["Fullstack"])
    matched_target = [s for s in target_skills if re.search(r"\b" + re.escape(s) + r"\b", lower_text)]
    
    # Calculate match percentage
    target_match_pct = len(matched_target) / len(target_skills) if target_skills else 0
    skills_score = min(40, int(target_match_pct * 80)) # Weight percentage up to 40 max
    
    # Identify missing skills
    missing_skills = []
    for s in target_skills[:12]: # Focus on top 12 primary skills for role
        if s not in matched_target:
            clean_s = s.upper() if len(s) <= 3 else s.title()
            missing_skills.append(clean_s)
            
    # Suggestions logic
    if missing_skills:
        suggestions.append(f"Add key missing technologies required for {target_role} roles: {', '.join(missing_skills[:5])}.")
        
    if "experience" in missing_sections:
        suggestions.append("Add a dedicated 'Work Experience' or 'Internships' section to describe professional history.")
        
    # Check metric highlights (good resumes have numbers)
    has_metrics = re.search(r"\b\d+%\b|\b\d+\s*(x|times)\b|\b\d+\s*(million|k|lakhs)\b", lower_text)
    if not has_metrics:
        suggestions.append("Incorporate quantitative metrics in your project descriptions (e.g. 'boosted performance by 25%', 'reduced memory consumption by 15%').")

    # Combine Scores
    ats_score = min(100, structure_score + formatting_score + skills_score)
    
    # Floor score to realistic minimums
    if ats_score < 20: ats_score = 25
    
    return {
        "ats_score": ats_score,
        "extracted_skills": extracted_skills[:20], # limit return count
        "missing_skills": missing_skills[:6],
        "suggestions": suggestions[:5]
    }
