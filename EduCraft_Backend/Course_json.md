{
  "id": "course-python-beginners-2025",
  "slug": "python-for-beginners-mastery",
  "title": "Python for Beginners: From Zero to Scripting",
  "description": "A comprehensive introductory course to Python programming. Learn core syntax, data types, control flow, functions, and basic object-oriented concepts. Perfect for absolute beginners with no prior programming experience.",
  "short_description": "Master Python fundamentals quickly and start writing your first scripts.",
  "instructor": "Alex Code",
  "author": "Alex Code",
  "category": "Programming",
  "level": "beginner",
  "duration_hours": 20,
  "estimated_time_minutes": 1200,
  "price": 49.99,
  "thumbnail_image": "https://example.com/images/python-beginner.jpg",
  "logo": "https://example.com/images/instructor-alex.jpg",
  "language": "en",
  "prerequisites": ["None"],
  "learning_objectives": [
    "Set up the Python development environment.",
    "Understand Python syntax, indentation, and comments.",
    "Work with basic data types (string, integer, float, boolean).",
    "Use conditional statements and loops to control program execution.",
    "Define and use functions to create reusable code.",
    "Handle complex data using Lists, Tuples, Sets, and Dictionaries."
  ],
  "certificate_available": true,
  "tags": ["python", "beginner", "programming", "scripting", "fundamentals"],
  "status": "published",
  "enrolled_count": 5500,
  "rating": 4.6,
  "reviews_count": 890,
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-12-02T09:00:00Z",
  "modules": [
    {
      "id": "module-001-intro-and-syntax",
      "title": "Introduction, Setup, and Python Syntax",
      "description": "Get started with Python. Learn how to install it, write your first program, and understand the crucial role of indentation.",
      "order": 1,
      "estimated_time_minutes": 180,
      "resources": [
        {
          "type": "link",
          "title": "Official Python Download Page",
          "url": "https://www.python.org/downloads/"
        }
      ],
      "topics": [
        {
          "id": "topic-001-intro-setup",
          "title": "What is Python and Installation",
          "description": "Overview of Python's uses and simple steps for installing the interpreter on various operating systems.",
          "order": 1,
          "sub_topics": [
            {
              "id": "subtopic-001-hello",
              "title": "Writing Your First Program ('Hello World')",
              "description": "The fundamental first step: using the print() function to display output.",
              "order": 1,
              "content": [
                {
                  "type": "text",
                  "value": "The print() function is used to output data to the standard output device (usually the console or screen). It is the simplest way to display information to the user."
                },
                {
                  "type": "code",
                  "value": "print(\"Hello World! This is my first Python program.\")"
                }
              ]
            }
          ]
        },
        {
          "id": "topic-002-syntax-comments",
          "title": "Python Syntax and Comments",
          "description": "Understanding indentation as structure, statements, and how to write comments for code clarity.",
          "order": 2,
          "sub_topics": [
            {
              "id": "subtopic-002-indentation",
              "title": "Indentation is Mandatory",
              "description": "Python uses whitespace (indentation) to define the scope of code blocks, unlike other languages that use curly braces.",
              "order": 1,
              "content": [
                {
                  "type": "text",
                  "value": "Indentation is mandatory and typically done using 4 spaces. Missing or incorrect indentation will result in an IndentationError."
                },
                {
                  "type": "code",
                  "value": "if 5 > 2:\n    print(\"Five is greater than two!\") # This is inside the 'if' block\n    print(\"The statement is true.\")"
                }
              ]
            },
            {
              "id": "subtopic-003-comments",
              "title": "Using Comments",
              "description": "How to use the # symbol for single-line comments to explain code functionality.",
              "order": 2,
              "content": [
                {
                  "type": "text",
                  "value": "Comments are ignored by the Python interpreter and are essential for documenting your code so other programmers (and your future self) can understand it."
                },
                {
                  "type": "code",
                  "value": "# This is a comment: it explains the next line\nname = \"Alice\" # Assigns the value 'Alice' to the variable 'name'"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "module-002-variables-data-types",
      "title": "Variables, Operators, and Core Data Types",
      "description": "Learn how to store information using variables, perform calculations with operators, and understand the basic types of data Python handles.",
      "order": 2,
      "estimated_time_minutes": 300,
      "resources": [
        {
          "type": "cheatsheet",
          "title": "Python Data Types Overview",
          "url": "https://example.com/resources/data-types-cheatsheet.pdf"
        }
      ],
      "topics": [
        {
          "id": "topic-003-variables",
          "title": "Variables and Assignment",
          "description": "Rules for naming variables, assigning values, and checking the data type.",
          "order": 1,
          "sub_topics": [
            {
              "id": "subtopic-004-assignment",
              "title": "Creating Variables and Casting",
              "description": "Variables are containers for storing data values. Python assigns the type automatically.",
              "order": 1,
              "content": [
                {
                  "type": "text",
                  "value": "Variables are created the moment you first assign a value to them. You don't need to declare them explicitly. Use the type() function to check the type."
                },
                {
                  "type": "code",
                  "value": "age = 25\nname = \"Bob\"\nis_student = True\nprint(type(age)) # Output: <class 'int'>"
                }
              ]
            }
          ]
        },
        {
          "id": "topic-004-operators",
          "title": "Python Operators",
          "description": "The different types of operators: Arithmetic, Assignment, Comparison, and Logical.",
          "order": 2,
          "sub_topics": [
            {
              "id": "subtopic-005-arithmetic",
              "title": "Arithmetic Operators (+, -, *, /)",
              "description": "Operators used to perform common mathematical operations, including modulus (%) and exponentiation (**).",
              "order": 1,
              "content": [
                {
                  "type": "text",
                  "value": "Arithmetic operators are used with numeric values to perform mathematical operations. The floor division (//) operator returns the integer division result."
                },
                {
                  "type": "code",
                  "value": "a = 10\nb = 3\nprint(f'Addition: {a + b}')\nprint(f'Floor Division: {a // b}')\nprint(f'Remainder (Modulus): {a % b}')"
                }
              ]
            },
            {
              "id": "subtopic-006-logical",
              "title": "Logical Operators (and, or, not)",
              "description": "Operators used to combine conditional statements, which return Boolean values (True or False).",
              "order": 2,
              "content": [
                {
                  "type": "text",
                  "value": "Logical operators are critical for decision-making in programs. and returns True if both statements are true; or returns True if one is true; not reverses the result."
                },
                {
                  "type": "code",
                  "value": "x = 10\ny = 5\nresult = (x > 8) and (y < 6)\nprint(f'Is result True? {result}')"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "module-003-collections-strings",
      "title": "Sequences and Collections (Lists, Strings, Dictionaries)",
      "description": "A deep dive into complex data types used to store multiple items, including strings, lists (mutable), and tuples (immutable).",
      "order": 3,
      "estimated_time_minutes": 420,
      "resources": [
        {
          "type": "quiz",
          "title": "Data Structures Practice Quiz",
          "url": "https://example.com/quizzes/collections-quiz"
        }
      ],
      "topics": [
        {
          "id": "topic-005-strings",
          "title": "Python Strings",
          "description": "Working with text, string slicing, concatenation, and useful built-in string methods.",
          "order": 1,
          "sub_topics": [
            {
              "id": "subtopic-007-slicing",
              "title": "Indexing and Slicing",
              "description": "Accessing individual characters (indexing) and subsections of a string (slicing).",
              "order": 1,
              "content": [
                {
                  "type": "text",
                  "value": "Strings are ordered sequences, meaning each character has an index, starting from 0. Slicing uses the format [start:end:step]."
                },
                {
                  "type": "code",
                  "value": "text = \"Python\"\nfirst_letter = text[0]\nslice_example = text[1:4]\nprint(f'First: {first_letter}, Slice: {slice_example}')"
                }
              ]
            }
          ]
        },
        {
          "id": "topic-006-lists",
          "title": "Lists (Arrays)",
          "description": "Mutable ordered sequences of items. Covers adding, removing, and changing elements.",
          "order": 2,
          "sub_topics": [
            {
              "id": "subtopic-008-list-methods",
              "title": "List Methods: append, insert, remove",
              "description": "Essential methods for modifying lists dynamically.",
              "order": 1,
              "content": [
                {
                  "type": "text",
                  "value": "Lists are mutable, meaning their contents can be changed after creation. append() adds an item to the end, and insert() adds an item at a specific index."
                },
                {
                  "type": "code",
                  "value": "fruits = [\"apple\", \"banana\"]\nfruits.append(\"cherry\")\nfruits.remove(\"apple\")\nprint(fruits)"
                }
              ]
            }
          ]
        },
        {
          "id": "topic-007-dictionaries",
          "title": "Dictionaries (Key-Value Pairs)",
          "description": "Unordered, changeable, and indexed collections of items, accessed via unique keys.",
          "order": 3,
          "sub_topics": [
            {
              "id": "subtopic-009-dict-access",
              "title": "Accessing and Modifying Dictionary Items",
              "description": "Retrieving values using their keys, and adding/updating entries.",
              "order": 1,
              "content": [
                {
                  "type": "text",
                  "value": "Dictionaries store data in {key: value} pairs. Keys must be unique and immutable (like strings or numbers). Values can be any data type."
                },
                {
                  "type": "code",
                  "value": "person = {\"name\": \"Jane\", \"age\": 30}\nprint(person[\"name\"])\nperson[\"age\"] = 31 # Modify value\nperson[\"city\"] = \"London\" # Add new item\nprint(person)"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "module-004-control-flow-functions",
      "title": "Control Flow and Functions",
      "description": "Learn to execute code conditionally using if statements and repeatedly using for and while loops. Finally, master functions to organize your code.",
      "order": 4,
      "estimated_time_minutes": 300,
      "resources": [
        {
          "type": "project",
          "title": "Simple Calculator Project",
          "url": "https://example.com/projects/simple-calc"
        }
      ],
      "topics": [
        {
          "id": "topic-008-conditionals",
          "title": "Conditional Statements (If, Elif, Else)",
          "description": "Using logical conditions to make decisions in your program.",
          "order": 1,
          "sub_topics": [
            {
              "id": "subtopic-010-if-else",
              "title": "Using If, Elif, and Else",
              "description": "The structure for executing blocks of code based on whether a condition is true.",
              "order": 1,
              "content": [
                {
                  "type": "text",
                  "value": "if executes if the condition is True. elif (else if) checks subsequent conditions. else runs if all preceding conditions are False."
                },
                {
                  "type": "code",
                  "value": "grade = 75\nif grade >= 90:\n    print(\"A\")\nelif grade >= 70:\n    print(\"C\")\nelse:\n    print(\"F\")"
                }
              ]
            }
          ]
        },
        {
          "id": "topic-009-loops",
          "title": "Loops (For and While)",
          "description": "Techniques for iterating over sequences or repeating code until a condition is met.",
          "order": 2,
          "sub_topics": [
            {
              "id": "subtopic-011-for-loop",
              "title": "The For Loop",
              "description": "Iterating through sequence items like Lists, Tuples, and Strings.",
              "order": 1,
              "content": [
                {
                  "type": "text",
                  "value": "A for loop is used for iterating over a sequence (that is, a list, tuple, dictionary, set, or string). Use the range() function to iterate a specific number of times."
                },
                {
                  "type": "code",
                  "value": "colors = [\"red\", \"green\", \"blue\"]\nfor color in colors:\n    print(f'I like {color}')"
                }
              ]
            },
            {
              "id": "subtopic-012-while-loop",
              "title": "The While Loop",
              "description": "Repeating code as long as a condition remains true.",
              "order": 2,
              "content": [
                {
                  "type": "text",
                  "value": "A while loop continues executing a block of code as long as its condition is True. Be careful not to create infinite loops!"
                },
                {
                  "type": "code",
                  "value": "i = 1\nwhile i < 6:\n    print(i)\n    i += 1 # Important: increment i to avoid infinite loop"
                }
              ]
            }
          ]
        },
        {
          "id": "topic-010-functions",
          "title": "Defining and Calling Functions",
          "description": "Creating reusable blocks of code using the def keyword.",
          "order": 3,
          "sub_topics": [
            {
              "id": "subtopic-013-parameters",
              "title": "Function Parameters and Return Values",
              "description": "Passing information into functions (arguments) and getting results out (return).",
              "order": 1,
              "content": [
                {
                  "type": "text",
                  "value": "Functions help break down large programs into smaller, manageable parts. Parameters are inputs defined in the function definition, and the return statement sends a value back to the caller."
                },
                {
                  "type": "code",
                  "value": "def greet(name):\n    \"\"\"This function greets the person passed in as a parameter.\"\"\"\n    return f\"Hello, {name}! How are you?\"\n\nmessage = greet(\"Charlie\")\nprint(message)"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}