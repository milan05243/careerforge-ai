import random

INTERVIEW_QA = {
    "DBMS": [
        {
            "id": "db-q1",
            "question": "What is Database Normalization and why do we use it? Explain 1NF, 2NF, and 3NF.",
            "keywords": ["normalization", "redundancy", "anomaly", "atomic", "partial dependency", "transitive dependency", "1nf", "2nf", "3nf", "table"],
            "ideal": "Normalization is the process of organizing database tables to reduce redundancy and dependency anomalies. 1NF ensures values are atomic. 2NF removes partial dependencies (every non-key attribute must fully depend on primary key). 3NF removes transitive dependencies."
        },
        {
            "id": "db-q2",
            "question": "Explain the ACID properties in transactions. Why are they critical?",
            "keywords": ["acid", "atomicity", "consistency", "isolation", "durability", "transaction", "rollback", "commit", "integrity"],
            "ideal": "ACID properties ensure transaction reliability. Atomicity guarantees 'all or nothing'. Consistency keeps database states valid. Isolation runs transactions concurrently without interference. Durability ensures committed changes survive crashes."
        }
    ],
    "OS": [
        {
            "id": "os-q1",
            "question": "What is virtual memory? How does the operating system implement paging?",
            "keywords": ["virtual memory", "paging", "page table", "ram", "disk", "translation", "address space", "page fault", "mmu"],
            "ideal": "Virtual memory is a memory management technique that makes RAM appear larger by swapping inactive blocks to disk. Paging divides memory into fixed-size blocks (pages and frames). The OS maps virtual page addresses to physical frame addresses using a Page Table."
        },
        {
            "id": "os-q2",
            "question": "What is a Deadlock? Explain the four necessary conditions for deadlock to occur.",
            "keywords": ["deadlock", "mutual exclusion", "hold and wait", "no preemption", "circular wait", "resources", "thread", "process"],
            "ideal": "A deadlock occurs when processes are unable to proceed because each holds a resource while waiting for another held by another process. The four conditions are: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait."
        }
    ],
    "CN": [
        {
            "id": "cn-q1",
            "question": "Explain the difference between TCP and UDP protocols. When would you use each?",
            "keywords": ["tcp", "udp", "connection-oriented", "connectionless", "reliable", "unreliable", "handshake", "packet", "speed", "streaming"],
            "ideal": "TCP is connection-oriented, reliable, guarantees packet delivery and order using a three-way handshake (used in HTTP, FTP, Email). UDP is connectionless, faster, does not guarantee delivery, and has lower overhead (used in video streaming, gaming, DNS)."
        },
        {
            "id": "cn-q2",
            "question": "What happens when you enter a URL (e.g. www.google.com) in your web browser? Describe the steps.",
            "keywords": ["dns", "ip address", "tcp handshake", "http request", "browser", "server", "render", "html", "get", "syn", "ack"],
            "ideal": "1. Browser checks cache for DNS. 2. DNS query resolves URL to IP. 3. Browser initiates TCP handshake. 4. Browser sends HTTP GET request. 5. Server processes and returns response. 6. Browser renders HTML/CSS/JS."
        }
    ],
    "OOPS": [
        {
            "id": "oop-q1",
            "question": "Explain the four pillars of Object-Oriented Programming with brief definitions.",
            "keywords": ["pillar", "encapsulation", "inheritance", "polymorphism", "abstraction", "class", "object", "interface", "private", "public"],
            "ideal": "1. Encapsulation: Hiding internal data using access modifiers (private/public). 2. Inheritance: Reusing code from parent to child class. 3. Polymorphism: Performing a single action in different ways (overloading/overriding). 4. Abstraction: Hiding implementation details and showing only functionality."
        },
        {
            "id": "oop-q2",
            "question": "What is the difference between an Interface and an Abstract Class?",
            "keywords": ["interface", "abstract class", "extend", "implement", "methods", "multiple inheritance", "variables", "instantiation"],
            "ideal": "An abstract class can have both abstract (empty) and concrete (with body) methods, and instance variables, supporting single inheritance. An interface can only have abstract declarations (in Java/C++) and static constants, enabling a class to implement multiple interfaces."
        }
    ],
    "HR": [
        {
            "id": "hr-q1",
            "question": "Tell me about a time you faced a conflict in a team project. How did you resolve it?",
            "keywords": ["conflict", "resolution", "disagreement", "team", "compromise", "communication", "listen", "star method", "result"],
            "ideal": "Use the STAR method: State the situation/disagreement, the task at hand, describe the steps you took to communicate constructively, hear their perspective, compromise, and outline the positive project outcome."
        },
        {
            "id": "hr-q2",
            "question": "Why should we hire you? What makes you a great fit for this software engineering role?",
            "keywords": ["fit", "skills", "learn", "passionate", "align", "adapt", "value", "experience", "contribute"],
            "ideal": "Align your skills directly with the job requirements. Express passion for their product, highlight your adaptability, ability to learn fast, and show how your experience (projects/internships) directly adds value."
        }
    ]
}

def generate_interview_question(topic: str) -> dict:
    """Selects a random interview question for a given topic."""
    questions = INTERVIEW_QA.get(topic.upper(), INTERVIEW_QA["HR"])
    q_data = random.choice(questions)
    return {
        "question": q_data["question"],
        "id": q_data["id"]
    }

def evaluate_interview_answer(question_id: str, user_answer: str) -> dict:
    """Evaluates answer text using keyword matches and structure metrics."""
    # Find question
    target_q = None
    topic_name = "HR"
    for topic, q_list in INTERVIEW_QA.items():
        for q in q_list:
            if q["id"] == question_id:
                target_q = q
                topic_name = topic
                break
        if target_q:
            break

    if not target_q:
        return {
            "score": 50,
            "feedback": "Evaluation system could not match this question. Try restarting your session.",
            "ideal": "Ensure your answer is structured and clear."
        }

    ans_lower = user_answer.lower()
    
    # Check length
    word_count = len(user_answer.split())
    if word_count < 15:
        return {
            "score": 30,
            "feedback": "Your response is extremely brief. Please expand your answer to cover the technical details or explain the concept more clearly.",
            "ideal": target_q["ideal"]
        }

    # Keyword Matching Score (Max 60 points)
    matched_keywords = []
    for kw in target_q["keywords"]:
        if kw in ans_lower:
            matched_keywords.append(kw)
            
    kw_pct = len(matched_keywords) / len(target_q["keywords"])
    kw_score = int(kw_pct * 60)

    # Elaboration & Structure Score (Max 40 points)
    elab_score = 0
    feedback_points = []
    
    if word_count >= 50:
        elab_score += 20
        feedback_points.append("✓ Good answer length and detail.")
    elif word_count >= 30:
        elab_score += 15
        feedback_points.append("⚠ Response is somewhat brief. Consider adding more detail.")
    else:
        elab_score += 5
        feedback_points.append("✗ Response is short. Elaborate on structural points and implementation.")

    # Quality indicators
    if topic_name == "HR":
        # Check STAR details
        has_situation = any(w in ans_lower for w in ["when", "project", "group", "situation", "academic"])
        has_action = any(w in ans_lower for w in ["i did", "implemented", "coded", "resolved", "action"])
        has_result = any(w in ans_lower for w in ["result", "outcome", "metric", "improved", "ended"])
        
        star_count = sum([has_situation, has_action, has_result])
        elab_score += star_count * 5
        if star_count == 3:
            feedback_points.append("✓ Excelled in applying the STAR methodology structures.")
        else:
            feedback_points.append("✗ Make sure to cover the Situation, Action, and Result explicitly.")
    else:
        # Technical explanations
        has_examples = any(w in ans_lower for w in ["example", "instance", "for check", "such as", "like"])
        if has_examples:
            elab_score += 10
            feedback_points.append("✓ Used concrete examples to explain technical concepts.")
        else:
            feedback_points.append("⚠ Add code or syntax examples to strengthen your explanation.")

        has_definition = any(w in ans_lower for w in ["defines", "is a", "refers to", "stands for"])
        if has_definition:
            elab_score += 10
            
    # Combine scores
    final_score = min(100, kw_score + elab_score)
    if final_score < 35: final_score = 35 # Floor score

    # Construct review feedback
    feedback_summary = " ".join(feedback_points)
    feedback_summary += f"\nMatched terminology: {', '.join(matched_keywords)}."
    
    if final_score < 70:
        feedback_summary += "\nTip: Read our recommended cheat sheet notes and review the ideal response below before retrying."

    return {
        "score": final_score,
        "feedback": feedback_summary,
        "ideal": target_q["ideal"]
    }
