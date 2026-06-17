from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional

class JobBase(BaseModel):
    id: str
    title: str
    company: str
    location: str
    salary: str
    experience: str
    type: str
    description: str
    requirements: List[str]
    benefits: List[str]

class JobResponse(JobBase):
    class Config:
        orm_mode = True

class ApplicationCreate(BaseModel):
    job_id: str
    candidate_name: str
    candidate_email: str

class ApplicationResponse(BaseModel):
    id: int
    job_id: str
    candidate_name: str
    candidate_email: str
    status: str
    resume_name: str
    applied_at: datetime
    job: Optional[JobResponse] = None
    
    class Config:
        orm_mode = True

class DsaProblemUpdate(BaseModel):
    completed: bool
    notes: Optional[str] = ""

class DsaProblemResponse(BaseModel):
    id: str
    title: str
    topic: str
    difficulty: str
    leetcode_link: str
    completed: bool
    notes: str

    class Config:
        orm_mode = True

class QuizScoreCreate(BaseModel):
    category: str
    correct: int
    total: int

class QuizScoreResponse(BaseModel):
    id: int
    category: str
    correct: int
    total: int
    date: datetime

    class Config:
        orm_mode = True

class InterviewStart(BaseModel):
    topic: str

class InterviewResponse(BaseModel):
    session_id: int
    topic: str
    question: str

class InterviewSubmit(BaseModel):
    session_id: int
    answer: str

class InterviewFeedback(BaseModel):
    session_id: int
    topic: str
    question: str
    answer: str
    score: int
    feedback: str
    date: datetime

    class Config:
        orm_mode = True

class CodeRunRequest(BaseModel):
    problem_id: str
    language: str
    code: str

class CodeRunResponse(BaseModel):
    success: bool
    output: str
    error: Optional[str] = None
