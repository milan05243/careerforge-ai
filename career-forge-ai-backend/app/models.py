from sqlalchemy import Column, Integer, String, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    location = Column(String, nullable=False)
    salary = Column(String, nullable=False)
    experience = Column(String, nullable=False)
    type = Column(String, nullable=False) # Full-Time / Intern
    description = Column(Text, nullable=False)
    requirements = Column(Text, nullable=False) # JSON/Delimiter string
    benefits = Column(Text, nullable=False) # JSON/Delimiter string
    
    applications = relationship("Application", back_populates="job")

class Application(Base):
    __tablename__ = "applications"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    job_id = Column(String, ForeignKey("jobs.id"), nullable=False)
    candidate_name = Column(String, nullable=False)
    candidate_email = Column(String, nullable=False)
    status = Column(String, default="Applied") # Applied, Shortlisted, Interviewing, Offer
    resume_name = Column(String, nullable=False)
    applied_at = Column(DateTime, default=datetime.utcnow)
    
    job = relationship("Job", back_populates="applications")

class DsaProblem(Base):
    __tablename__ = "dsa_problems"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    difficulty = Column(String, nullable=False) # Easy, Medium, Hard
    leetcode_link = Column(String, nullable=False)
    completed = Column(Boolean, default=False)
    notes = Column(Text, default="")

class QuizScore(Base):
    __tablename__ = "quiz_scores"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category = Column(String, nullable=False)
    correct = Column(Integer, nullable=False)
    total = Column(Integer, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)

class InterviewSession(Base):
    __tablename__ = "interview_sessions"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    topic = Column(String, nullable=False) # DBMS, OS, CN, OOPS, HR
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=True)
    score = Column(Integer, nullable=True)
    feedback = Column(Text, nullable=True)
    date = Column(DateTime, default=datetime.utcnow)
