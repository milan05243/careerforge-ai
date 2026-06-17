import json
from app.database import SessionLocal, Base, engine
from app.models import Job, DsaProblem

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Seed Jobs
jobs_to_seed = [
    {
        "id": "g-sd-1",
        "title": "Software Engineer - Frontend",
        "company": "Google",
        "location": "Bangalore, India",
        "salary": "₹24,00,000 - ₹32,00,000",
        "experience": "1 - 3 Years",
        "type": "Full-Time",
        "description": "Google is looking for a Software Engineer to join our core Web Experience team. In this role, you will build next-generation user interfaces, collaborate with design and product teams, and optimize application performance across web platforms.",
        "requirements": json.dumps([
            "Bachelor's degree in Computer Science, related technical field, or equivalent practical experience.",
            "1+ years of experience working with HTML, CSS, and JavaScript frameworks (React, Angular, or Vue).",
            "Solid understanding of data structures, algorithms, and web application design principles."
        ]),
        "benefits": json.dumps([
            "Competitive compensation package + Equity",
            "Comprehensive medical, dental, and vision benefits",
            "Free gourmet meals and snacks in our premium campuses"
        ])
    },
    {
        "id": "a-sde-1",
        "title": "Software Development Engineer (SDE-1)",
        "company": "Amazon",
        "location": "Hyderabad, India",
        "salary": "₹18,00,000 - ₹25,00,000",
        "experience": "Freshers",
        "type": "Full-Time",
        "description": "Amazon's Customer Fulfillment Technology team is looking for a SDE-1 who is passionate about solving complex, real-world problems. You will design, develop, and deploy scalable cloud services that power millions of customer orders daily.",
        "requirements": json.dumps([
            "B.Tech / M.Tech in Computer Science, Information Technology, or equivalent.",
            "Proficiency in at least one modern programming language such as Java, C++, Python, or C#.",
            "Strong foundation in OOP design, multi-threaded programming, and system architecture."
        ]),
        "benefits": json.dumps([
            "Top-tier base salary and Amazon stock units",
            "Relocation support and premium health coverage",
            "Generous wellness benefits and parental leave"
        ])
    },
    {
        "id": "m-swe-2",
        "title": "Software Engineer II",
        "company": "Microsoft",
        "location": "Noida, India (Hybrid)",
        "salary": "₹28,00,000 - ₹38,00,000",
        "experience": "2 - 5 Years",
        "type": "Full-Time",
        "description": "Join the Azure Cloud Infrastructure team. As a Software Engineer II, you will design robust, distributed services, manage security compliance, and implement automation layers for scaling containerized workloads on Kubernetes.",
        "requirements": json.dumps([
            "BS/MS in Computer Science or related fields.",
            "2+ years of software development experience shipping web-scale cloud services.",
            "Expertise in Go, Rust, Java, or C++ and distributed systems concepts."
        ]),
        "benefits": json.dumps([
            "Highly competitive base pay, bonus, and stock options",
            "Comprehensive healthcare, mental health, and wellness programs",
            "Generous hybrid working schedule"
        ])
    },
    {
        "id": "tcs-get",
        "title": "Graduate Engineer Trainee",
        "company": "TCS",
        "location": "Pune, India",
        "salary": "₹3,60,000 - ₹7,00,000",
        "experience": "Freshers",
        "type": "Full-Time",
        "description": "TCS is hiring fresh engineering graduates for our Digital and Ninja tracks. You will undergo an intensive initial training program in enterprise technologies, cloud computing, or cybersecurity.",
        "requirements": json.dumps([
            "BE / B.Tech / ME / M.Tech / MCA / M.Sc from 2025/2026 passing out batch.",
            "Minimum 60% or 6.0 CGPA throughout class X, XII, Diploma, and Graduation.",
            "Basic understanding of any programming language (C, C++, Java, or Python) and SQL."
        ]),
        "benefits": json.dumps([
            "Structured entry-level training & professional certifications",
            "Defined career progression path (Ninja to Digital tracks)",
            "Standard health insurance benefits"
        ])
    }
]

# Seed DSA Problems
dsa_problems_to_seed = [
    {
        "id": "two-sum",
        "title": "Two Sum",
        "topic": "Arrays",
        "difficulty": "Easy",
        "leetcode_link": "https://leetcode.com/problems/two-sum/",
        "completed": False,
        "notes": ""
    },
    {
        "id": "max-subarray",
        "title": "Maximum Subarray (Kadane's)",
        "topic": "Arrays",
        "difficulty": "Medium",
        "leetcode_link": "https://leetcode.com/problems/maximum-subarray/",
        "completed": False,
        "notes": ""
    },
    {
        "id": "valid-palindrome",
        "title": "Valid Palindrome",
        "topic": "Strings",
        "difficulty": "Easy",
        "leetcode_link": "https://leetcode.com/problems/valid-palindrome/",
        "completed": False,
        "notes": ""
    },
    {
        "id": "reverse-ll",
        "title": "Reverse Linked List",
        "topic": "Linked Lists",
        "difficulty": "Easy",
        "leetcode_link": "https://leetcode.com/problems/reverse-linked-list/",
        "completed": False,
        "notes": ""
    },
    {
        "id": "climbing-stairs",
        "title": "Climbing Stairs",
        "topic": "Dynamic Programming",
        "difficulty": "Easy",
        "leetcode_link": "https://leetcode.com/problems/climbing-stairs/",
        "completed": False,
        "notes": ""
    }
]

# Clear existing entries
db.query(Job).delete()
db.query(DsaProblem).delete()

# Insert seeding data
for j in jobs_to_seed:
    db.add(Job(**j))
    
for p in dsa_problems_to_seed:
    db.add(DsaProblem(**p))

db.commit()
db.close()
print("Database seeding completed successfully!")
