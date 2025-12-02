export const courseModules = [
  {
    id: 1,
    title: "Introduction",
    duration: "3 mins",
    type: "video",
    submodules: [
      { id: 101, title: "Welcome to the Course", completed: false },
      { id: 102, title: "Course Overview", completed: false },
      { id: 103, title: "Quiz: Introduction", type: "quiz", completed: false }
    ]
  },
  {
    id: 2,
    title: "Introduction to DSPy",
    duration: "4 mins",
    type: "video",
    submodules: [
      { id: 201, title: "What is DSPy?", completed: false },
      { id: 202, title: "DSPy Architecture", completed: false },
      { id: 203, title: "Quiz: DSPy Basics", type: "quiz", completed: false }
    ]
  },
  {
    id: 3,
    title: "DSPy Programming - Signatures and Modules",
    duration: "17 mins",
    type: "code",
    submodules: [
      { id: 301, title: "Understanding Signatures", completed: false },
      { id: 302, title: "Creating Modules", completed: false },
      { id: 303, title: "Practical Examples", completed: false },
      { id: 304, title: "Quiz: Signatures & Modules", type: "quiz", completed: false }
    ]
  },
  {
    id: 4,
    title: "Debug Your DSPy Agent with MLflow Tracing",
    duration: "11 mins",
    type: "code",
    submodules: [
      { id: 401, title: "Setting Up MLflow", completed: false },
      { id: 402, title: "Tracing Basics", completed: false },
      { id: 403, title: "Quiz: MLflow Tracing", type: "quiz", completed: false }
    ]
  },
  {
    id: 5,
    title: "Optimizing Agents with DSPy Optimizer",
    duration: "10 mins",
    type: "code",
    submodules: [
      { id: 501, title: "Optimizer Fundamentals", completed: false },
      { id: 502, title: "Advanced Optimization", completed: false },
      { id: 503, title: "Quiz: Optimization", type: "quiz", completed: false }
    ]
  },
  {
    id: 6,
    title: "Conclusion",
    duration: "1 min",
    type: "video",
    submodules: [
      { id: 601, title: "Course Summary", completed: false },
      { id: 602, title: "Next Steps", completed: false },
      { id: 603, title: "Final Quiz", type: "quiz", completed: false }
    ]
  }
];