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
        },
        {
    "id": "db-q3",
    "question": "What is the difference between a Primary Key and a Foreign Key?",
    "keywords": ["primary key", "foreign key", "unique", "relationship", "table", "reference", "constraint"],
    "ideal": "A Primary Key uniquely identifies each record in a table and cannot contain NULL values. A Foreign Key establishes a relationship between two tables by referencing the Primary Key of another table."
},
{
    "id": "db-q4",
    "question": "What are SQL Joins? Explain different types of joins.",
    "keywords": ["join", "inner join", "left join", "right join", "full join", "matching", "table"],
    "ideal": "SQL Joins are used to combine rows from multiple tables. INNER JOIN returns matching rows, LEFT JOIN returns all rows from left table, RIGHT JOIN returns all rows from right table, and FULL OUTER JOIN returns all rows from both tables."
},
{
    "id": "db-q5",
    "question": "What is indexing in DBMS? What are its advantages and disadvantages?",
    "keywords": ["index", "search", "b-tree", "performance", "query", "retrieval"],
    "ideal": "Indexing is a technique used to improve data retrieval speed. It uses structures like B-Trees. Advantages include faster queries, while disadvantages include additional storage and slower insert/update operations."
},
{
    "id": "db-q6",
    "question": "What is the difference between DELETE, DROP, and TRUNCATE commands?",
    "keywords": ["delete", "drop", "truncate", "table", "rows", "ddl", "dml"],
    "ideal": "DELETE removes specific rows and can be rolled back. TRUNCATE removes all rows while preserving table structure. DROP completely removes the table structure and data."
},
{
    "id": "db-q7",
    "question": "What is a transaction in DBMS? Explain COMMIT and ROLLBACK.",
    "keywords": ["transaction", "commit", "rollback", "consistency", "atomicity", "database"],
    "ideal": "A transaction is a sequence of database operations performed as a single unit. COMMIT permanently saves changes, while ROLLBACK undoes changes if an error occurs."
},
{
    "id": "db-q8",
    "question": "What is denormalization? Why is it used?",
    "keywords": ["denormalization", "performance", "redundancy", "join", "query"],
    "ideal": "Denormalization is the process of adding redundancy to improve read performance. It reduces the need for complex joins but increases redundancy."
},
{
    "id": "db-q9",
    "question": "Explain the difference between clustered and non-clustered indexes.",
    "keywords": ["clustered index", "non clustered index", "index", "sorting", "storage"],
    "ideal": "A clustered index determines the physical order of data in a table, while a non-clustered index creates a separate structure that points to the data rows."
},
{
    "id": "db-q10",
    "question": "What are database anomalies? Explain insertion, deletion, and update anomalies.",
    "keywords": ["anomaly", "insertion", "deletion", "update", "redundancy"],
    "ideal": "Database anomalies occur due to redundancy. Insertion anomaly prevents adding data, deletion anomaly causes loss of information, and update anomaly leads to inconsistent data."
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
        },
        {
    "id": "os-q3",
    "question": "What is the difference between a process and a thread?",
    "keywords": ["process", "thread", "memory", "execution", "multithreading"],
    "ideal": "A process is an independent execution unit with its own memory space, whereas threads share the same memory space within a process."
},
{
    "id": "os-q4",
    "question": "What is CPU scheduling? Explain FCFS and Round Robin.",
    "keywords": ["cpu scheduling", "fcfs", "round robin", "time quantum", "process"],
    "ideal": "CPU scheduling selects the next process for execution. FCFS executes processes in arrival order, while Round Robin allocates CPU using a fixed time quantum."
},
{
    "id": "os-q5",
    "question": "What is a semaphore and why is it used?",
    "keywords": ["semaphore", "synchronization", "mutex", "critical section"],
    "ideal": "A semaphore is a synchronization mechanism used to control access to shared resources and avoid race conditions."
},
{
    "id": "os-q6",
    "question": "Explain demand paging and page faults.",
    "keywords": ["demand paging", "page fault", "memory", "paging"],
    "ideal": "Demand paging loads pages into memory only when required. A page fault occurs when a requested page is not present in RAM."
},
{
    "id": "os-q7",
    "question": "What is thrashing in operating systems?",
    "keywords": ["thrashing", "paging", "memory", "performance"],
    "ideal": "Thrashing occurs when the system spends more time swapping pages than executing processes."
},
{
    "id": "os-q8",
    "question": "What is the difference between internal and external fragmentation?",
    "keywords": ["internal fragmentation", "external fragmentation", "memory"],
    "ideal": "Internal fragmentation wastes memory inside allocated blocks, while external fragmentation occurs due to scattered free memory spaces."
},
{
    "id": "os-q9",
    "question": "Explain the producer-consumer problem.",
    "keywords": ["producer consumer", "buffer", "synchronization", "semaphore"],
    "ideal": "The producer-consumer problem involves synchronizing processes that share a common buffer to avoid overflow and underflow."
},
{
    "id": "os-q10",
    "question": "What is context switching?",
    "keywords": ["context switch", "cpu", "process", "scheduler"],
    "ideal": "Context switching is the process of saving the state of one process and loading the state of another process."
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
        },
        {
    "id": "cn-q3",
    "question": "Explain the OSI model and its layers.",
    "keywords": ["osi", "physical", "data link", "network", "transport", "application"],
    "ideal": "The OSI model consists of seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application."
},
{
    "id": "cn-q4",
    "question": "What is DNS and how does it work?",
    "keywords": ["dns", "domain name", "ip address", "resolution"],
    "ideal": "DNS translates domain names into IP addresses, enabling communication between clients and servers."
},
{
    "id": "cn-q5",
    "question": "What is the difference between a hub, switch, and router?",
    "keywords": ["hub", "switch", "router", "network device"],
    "ideal": "A hub broadcasts data, a switch forwards frames using MAC addresses, and a router forwards packets using IP addresses."
},
{
    "id": "cn-q6",
    "question": "What is an IP address? Differentiate IPv4 and IPv6.",
    "keywords": ["ip address", "ipv4", "ipv6", "network"],
    "ideal": "An IP address uniquely identifies devices on a network. IPv4 uses 32-bit addresses, while IPv6 uses 128-bit addresses."
},
{
    "id": "cn-q7",
    "question": "What is ARP?",
    "keywords": ["arp", "mac address", "ip address"],
    "ideal": "ARP (Address Resolution Protocol) maps IP addresses to MAC addresses in a local network."
},
{
    "id": "cn-q8",
    "question": "Explain the three-way handshake in TCP.",
    "keywords": ["three way handshake", "syn", "ack", "tcp"],
    "ideal": "TCP establishes a connection using SYN, SYN-ACK, and ACK packets."
},
{
    "id": "cn-q9",
    "question": "What is subnetting and why is it used?",
    "keywords": ["subnetting", "network", "ip", "addressing"],
    "ideal": "Subnetting divides a network into smaller subnetworks to improve efficiency and security."
},
{
    "id": "cn-q10",
    "question": "What is NAT?",
    "keywords": ["nat", "network address translation", "private ip", "public ip"],
    "ideal": "NAT translates private IP addresses into public IP addresses for internet communication."
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
        },
        {
    "id": "oop-q3",
    "question": "What is encapsulation? Explain with an example.",
    "keywords": ["encapsulation", "data hiding", "private", "class"],
    "ideal": "Encapsulation is the binding of data and methods into a single unit while restricting direct access using access modifiers."
},
{
    "id": "oop-q4",
    "question": "What is inheritance and what are its advantages?",
    "keywords": ["inheritance", "reuse", "parent", "child"],
    "ideal": "Inheritance allows a class to acquire properties and methods of another class, promoting code reuse."
},
{
    "id": "oop-q5",
    "question": "Differentiate method overloading and method overriding.",
    "keywords": ["overloading", "overriding", "compile time", "runtime"],
    "ideal": "Overloading occurs in the same class with different parameters, while overriding redefines a parent class method in a child class."
},
{
    "id": "oop-q6",
    "question": "What is abstraction and why is it important?",
    "keywords": ["abstraction", "abstract class", "interface"],
    "ideal": "Abstraction hides implementation details and exposes only essential functionality."
},
{
    "id": "oop-q7",
    "question": "What is a constructor? Explain different types.",
    "keywords": ["constructor", "default constructor", "parameterized constructor"],
    "ideal": "A constructor initializes objects. Common types include default and parameterized constructors."
},
{
    "id": "oop-q8",
    "question": "What is polymorphism? Explain compile-time and runtime polymorphism.",
    "keywords": ["polymorphism", "overloading", "overriding"],
    "ideal": "Polymorphism allows objects to take multiple forms. Overloading provides compile-time polymorphism, while overriding provides runtime polymorphism."
},
{
    "id": "oop-q9",
    "question": "What is the difference between an abstract class and an interface?",
    "keywords": ["abstract class", "interface", "inheritance"],
    "ideal": "An abstract class can contain both abstract and concrete methods, while an interface defines only method declarations."
},
{
    "id": "oop-q10",
    "question": "What is dynamic binding?",
    "keywords": ["dynamic binding", "runtime", "polymorphism"],
    "ideal": "Dynamic binding resolves method calls at runtime and supports runtime polymorphism."
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
        },
        {
    "id": "hr-q3",
    "question": "What are your strengths and weaknesses?",
    "keywords": ["strength", "weakness", "improvement", "learn"],
    "ideal": "Discuss genuine strengths aligned with the role and mention a weakness along with steps you are taking to improve it."
},
{
    "id": "hr-q4",
    "question": "Where do you see yourself in the next five years?",
    "keywords": ["career", "growth", "learn", "goal"],
    "ideal": "Express your desire to grow technically, contribute to the organization, and take on greater responsibilities."
},
{
    "id": "hr-q5",
    "question": "Why do you want to join our company?",
    "keywords": ["company", "culture", "growth", "product"],
    "ideal": "Highlight the company's culture, products, learning opportunities, and alignment with your career goals."
},
{
    "id": "hr-q6",
    "question": "Describe a challenging situation you faced and how you handled it.",
    "keywords": ["challenge", "problem", "solution", "team"],
    "ideal": "Use the STAR method to explain the situation, actions taken, and the final outcome."
},
{
    "id": "hr-q7",
    "question": "How do you handle pressure and deadlines?",
    "keywords": ["pressure", "deadline", "planning", "time management"],
    "ideal": "Explain how planning, prioritization, and communication help you manage pressure effectively."
},
{
    "id": "hr-q8",
    "question": "Why did you choose Computer Science as your field?",
    "keywords": ["computer science", "technology", "interest", "career"],
    "ideal": "Discuss your passion for technology, problem-solving, and software development."
},
{
    "id": "hr-q9",
    "question": "Tell us about one of your projects.",
    "keywords": ["project", "role", "technology", "implementation"],
    "ideal": "Explain the project's objective, your contributions, technologies used, challenges faced, and outcomes."
},
{
    "id": "hr-q10",
    "question": "Do you have any questions for us?",
    "keywords": ["company", "role", "team", "growth"],
    "ideal": "Ask thoughtful questions about the role, team, learning opportunities, or company culture."
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
