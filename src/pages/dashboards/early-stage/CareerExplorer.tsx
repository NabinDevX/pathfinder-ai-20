import { useState } from "react";
import { BookOpen, Code, Palette, Microscope, Calculator, Globe, Music, Wrench, Users, Lightbulb, ArrowLeft, CheckCircle, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";

const CareerExplorer = () => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const careerFields = [
    {
      id: "stem",
      name: "STEM",
      icon: Microscope,
      color: "from-blue-500 to-cyan-500",
      description: "Science, Technology, Engineering & Mathematics",
      careers: ["Software Engineer", "Doctor", "Research Scientist", "Data Analyst", "Aerospace Engineer"],
      skills: ["Problem Solving", "Analytical Thinking", "Mathematical Skills", "Research"],
      story: "Imagine creating the next breakthrough in medicine or developing apps that millions use daily!"
    },
    {
      id: "arts",
      name: "Arts & Creative",
      icon: Palette,
      color: "from-pink-500 to-purple-500",
      description: "Visual Arts, Performing Arts & Creative Expression",
      careers: ["Graphic Designer", "Filmmaker", "Writer", "Animator", "Art Director"],
      skills: ["Creativity", "Visual Communication", "Storytelling", "Innovation"],
      story: "Turn your imagination into reality through visual arts, stories, and creative expression!"
    },
    {
      id: "business",
      name: "Business & Commerce",
      icon: Calculator,
      color: "from-green-500 to-emerald-500",
      description: "Finance, Management & Entrepreneurship",
      careers: ["Business Analyst", "Marketing Manager", "Entrepreneur", "Accountant", "Consultant"],
      skills: ["Leadership", "Communication", "Strategic Thinking", "Financial Literacy"],
      story: "Lead teams, start your own company, or help businesses grow and succeed!"
    },
    {
      id: "communication",
      name: "Communication & Media",
      icon: Globe,
      color: "from-orange-500 to-red-500",
      description: "Journalism, Public Relations & Digital Media",
      careers: ["Journalist", "Content Creator", "PR Specialist", "Social Media Manager", "News Anchor"],
      skills: ["Writing", "Public Speaking", "Research", "Digital Literacy"],
      story: "Share important stories with the world and shape public opinion through media!"
    },
    {
      id: "sports",
      name: "Sports & Fitness",
      icon: Users,
      color: "from-teal-500 to-green-500",
      description: "Athletics, Coaching & Sports Management",
      careers: ["Professional Athlete", "Sports Coach", "Fitness Trainer", "Sports Journalist", "Sports Manager"],
      skills: ["Physical Fitness", "Teamwork", "Discipline", "Leadership"],
      story: "Combine your love for sports with a career that keeps you active and competitive!"
    },
    {
      id: "social",
      name: "Social Impact",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      description: "Education, Social Work & Community Service",
      careers: ["Teacher", "Social Worker", "NGO Leader", "Counselor", "Community Developer"],
      skills: ["Empathy", "Communication", "Problem Solving", "Patience"],
      story: "Make a difference in people's lives and contribute to building a better society!"
    }
  ];

  const careerQuizQuestions = [
    {
      id: 1,
      question: "What type of environment do you prefer to work in?",
      options: [
        "A quiet office with computers and technology",
        "A creative studio with art supplies and inspiration",
        "A busy office with meetings and presentations",
        "Outdoors or in different locations"
      ],
      category: ["STEM", "Arts", "Business", "Sports"]
    },
    {
      id: 2,
      question: "Which activity sounds most interesting to you?",
      options: [
        "Solving complex math problems",
        "Creating digital artwork or videos",
        "Leading a team project",
        "Writing articles or stories"
      ],
      category: ["STEM", "Arts", "Business", "Communication"]
    },
    {
      id: 3,
      question: "What motivates you the most?",
      options: [
        "Making scientific discoveries",
        "Expressing creativity and imagination",
        "Building successful businesses",
        "Helping people in need"
      ],
      category: ["STEM", "Arts", "Business", "Social"]
    },
    {
      id: 4,
      question: "How do you prefer to spend your free time?",
      options: [
        "Learning new programming languages",
        "Drawing, painting, or designing",
        "Reading business magazines",
        "Playing sports or exercising"
      ],
      category: ["STEM", "Arts", "Business", "Sports"]
    },
    {
      id: 5,
      question: "What type of problem-solving appeals to you?",
      options: [
        "Technical and analytical challenges",
        "Creative and artistic challenges",
        "Strategic business challenges",
        "Social and community challenges"
      ],
      category: ["STEM", "Arts", "Business", "Social"]
    },
    {
      id: 6,
      question: "Which school subject do you enjoy most?",
      options: [
        "Mathematics and Science",
        "Art and Design",
        "Economics and Business Studies",
        "English and Literature"
      ],
      category: ["STEM", "Arts", "Business", "Communication"]
    },
    {
      id: 7,
      question: "What kind of impact do you want to make?",
      options: [
        "Innovate and create new technologies",
        "Inspire people through creative work",
        "Build and grow successful companies",
        "Make a positive difference in society"
      ],
      category: ["STEM", "Arts", "Business", "Social"]
    },
    {
      id: 8,
      question: "How do you prefer to communicate with others?",
      options: [
        "Through data and logical presentations",
        "Through visual and creative mediums",
        "Through persuasive and strategic discussions",
        "Through public speaking and media"
      ],
      category: ["STEM", "Arts", "Business", "Communication"]
    },
    {
      id: 9,
      question: "What type of skills would you like to develop?",
      options: [
        "Programming and technical skills",
        "Artistic and design skills",
        "Leadership and management skills",
        "Physical fitness and athletic skills"
      ],
      category: ["STEM", "Arts", "Business", "Sports"]
    },
    {
      id: 10,
      question: "Which work schedule appeals to you most?",
      options: [
        "Regular hours with deep focus time",
        "Flexible hours with creative freedom",
        "Varied schedule with meetings and travel",
        "Active schedule with physical activity"
      ],
      category: ["STEM", "Arts", "Business", "Sports"]
    },
    {
      id: 11,
      question: "What type of recognition do you value?",
      options: [
        "Recognition for technical innovation",
        "Recognition for creative excellence",
        "Recognition for business success",
        "Recognition for helping others"
      ],
      category: ["STEM", "Arts", "Business", "Social"]
    },
    {
      id: 12,
      question: "Which tool would you most like to master?",
      options: [
        "Advanced software and programming tools",
        "Design software and artistic tools",
        "Business analytics and strategy tools",
        "Communication and media tools"
      ],
      category: ["STEM", "Arts", "Business", "Communication"]
    },
    {
      id: 13,
      question: "What type of challenges excite you?",
      options: [
        "Debugging code and solving technical issues",
        "Creating something beautiful from nothing",
        "Growing a business from idea to success",
        "Improving community wellness and health"
      ],
      category: ["STEM", "Arts", "Business", "Social"]
    },
    {
      id: 14,
      question: "How do you prefer to learn new things?",
      options: [
        "Through experimentation and testing",
        "Through hands-on creative practice",
        "Through case studies and real examples",
        "Through interactive and social activities"
      ],
      category: ["STEM", "Arts", "Business", "Sports"]
    },
    {
      id: 15,
      question: "What type of workspace inspires you?",
      options: [
        "A high-tech lab or development environment",
        "A colorful studio with creative materials",
        "A modern office with meeting rooms",
        "Various locations and outdoor spaces"
      ],
      category: ["STEM", "Arts", "Business", "Communication"]
    },
    {
      id: 16,
      question: "Which achievement would make you proudest?",
      options: [
        "Developing a breakthrough technology",
        "Creating award-winning creative content",
        "Building a successful startup company",
        "Making a positive impact on people's lives"
      ],
      category: ["STEM", "Arts", "Business", "Social"]
    },
    {
      id: 17,
      question: "What type of collaboration do you prefer?",
      options: [
        "Working with other technical specialists",
        "Collaborating with creative professionals",
        "Leading diverse business teams",
        "Working directly with community members"
      ],
      category: ["STEM", "Arts", "Business", "Social"]
    },
    {
      id: 18,
      question: "Which type of research interests you most?",
      options: [
        "Scientific and technical research",
        "Cultural and artistic research",
        "Market and consumer research",
        "Social and behavioral research"
      ],
      category: ["STEM", "Arts", "Business", "Social"]
    },
    {
      id: 19,
      question: "What type of events would you enjoy attending?",
      options: [
        "Technology conferences and hackathons",
        "Art exhibitions and creative workshops",
        "Business networking and trade shows",
        "Sports competitions and fitness events"
      ],
      category: ["STEM", "Arts", "Business", "Sports"]
    },
    {
      id: 20,
      question: "Which skill comes most naturally to you?",
      options: [
        "Logical thinking and analysis",
        "Creative expression and imagination",
        "Persuasion and influence",
        "Physical coordination and athletics"
      ],
      category: ["STEM", "Arts", "Business", "Sports"]
    },
    {
      id: 21,
      question: "What type of media do you consume most?",
      options: [
        "Tech blogs and scientific journals",
        "Art magazines and creative content",
        "Business news and entrepreneurship stories",
        "News and current affairs"
      ],
      category: ["STEM", "Arts", "Business", "Communication"]
    },
    {
      id: 22,
      question: "Which type of mentor would you choose?",
      options: [
        "A successful engineer or scientist",
        "A renowned artist or designer",
        "A successful entrepreneur or CEO",
        "A respected teacher or social worker"
      ],
      category: ["STEM", "Arts", "Business", "Social"]
    },
    {
      id: 23,
      question: "What type of legacy do you want to leave?",
      options: [
        "Technological innovations that change the world",
        "Creative works that inspire future generations",
        "Successful businesses that create opportunities",
        "Positive changes in communities and society"
      ],
      category: ["STEM", "Arts", "Business", "Social"]
    },
    {
      id: 24,
      question: "Which type of competition appeals to you?",
      options: [
        "Coding competitions and tech challenges",
        "Art contests and creative competitions",
        "Business plan competitions and pitch contests",
        "Athletic competitions and sports tournaments"
      ],
      category: ["STEM", "Arts", "Business", "Sports"]
    },
    {
      id: 25,
      question: "What would be your ideal work-life balance?",
      options: [
        "Focused work periods with tech projects",
        "Flexible schedule with creative inspiration time",
        "Dynamic schedule with business networking",
        "Active lifestyle with physical challenges"
      ],
      category: ["STEM", "Arts", "Business", "Sports"]
    }
  ];

  const interactiveModules = [
    {
      title: "Day in the Life",
      description: "Experience a typical day in different careers through interactive simulations",
      status: "Available",
      progress: 0
    },
    {
      title: "Career Matching Quiz",
      description: "Answer fun questions to discover careers that match your interests",
      status: "In Progress",
      progress: 60
    },
    {
      title: "Industry Spotlight",
      description: "Learn about trending industries and emerging career opportunities",
      status: "Available",
      progress: 0
    },
    {
      title: "Success Stories",
      description: "Read inspiring stories from young professionals in various fields",
      status: "Completed",
      progress: 100
    }
  ];

  return (
    <DashboardLayout 
      title="Career Explorer" 
      description="Discover exciting career possibilities through interactive exploration"
    >
      {!showQuiz ? (
        <div className="p-6 space-y-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Explore Your Future 🚀
            </h2>
            <p className="text-muted-foreground mb-4">
              Discover different career fields through engaging stories and real-world examples. 
              No pressure - just explore what excites you!
            </p>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6"
              onClick={() => setShowQuiz(true)}
            >
              Take Career Interest Quiz
            </Button>
          </div>

          <Tabs defaultValue="fields" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fields">Career Fields</TabsTrigger>
              <TabsTrigger value="modules">Interactive Modules</TabsTrigger>
            </TabsList>

            <TabsContent value="fields" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careerFields.map((field) => (
                  <Card 
                    key={field.id} 
                    className={`hover:shadow-lg transition-all cursor-pointer ${
                      selectedField === field.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedField(selectedField === field.id ? null : field.id)}
                  >
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${field.color} flex items-center justify-center mb-2`}>
                        <field.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{field.name}</CardTitle>
                      <CardDescription>{field.description}</CardDescription>
                    </CardHeader>
                    
                    {selectedField === field.id && (
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">💡 {field.story}</h4>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Popular Careers:</h4>
                          <div className="flex flex-wrap gap-1">
                            {field.careers.map((career) => (
                              <Badge key={career} variant="secondary" className="text-xs">
                                {career}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Key Skills:</h4>
                          <div className="flex flex-wrap gap-1">
                            {field.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button className="w-full" size="sm">
                          Explore This Field
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="modules" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {interactiveModules.map((module, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <Badge 
                          variant={module.status === 'Completed' ? 'default' : 
                                  module.status === 'In Progress' ? 'secondary' : 'outline'}
                        >
                          {module.status}
                        </Badge>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {module.progress > 0 && (
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      <Button className="w-full" variant={module.status === 'Completed' ? 'outline' : 'default'}>
                        {module.status === 'Completed' ? 'Review' : 
                         module.status === 'In Progress' ? 'Continue' : 'Start'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Fun Fact Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Did You Know?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">65%</div>
                  <div className="text-sm text-muted-foreground">of future jobs don't exist today</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">7</div>
                  <div className="text-sm text-muted-foreground">average career changes in a lifetime</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">15+</div>
                  <div className="text-sm text-muted-foreground">new skills learned every year</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : !showResults ? (
        <div className="p-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowQuiz(false)}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <CardTitle className="text-2xl">Career Interest Quiz</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowQuiz(false)}
                  className="text-gray-600"
                >
                  Exit Quiz
                </Button>
              </div>
              <Progress value={(currentQuestion / careerQuizQuestions.length) * 100} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {careerQuizQuestions.length}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {careerQuizQuestions[currentQuestion].question}
                </h3>

                <RadioGroup
                  value={answers[currentQuestion] || ""}
                  onValueChange={(value) => {
                    const newAnswers = [...answers];
                    newAnswers[currentQuestion] = value;
                    setAnswers(newAnswers);
                  }}
                  className="space-y-4"
                >
                  {careerQuizQuestions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                {currentQuestion === careerQuizQuestions.length - 1 ? (
                  <Button
                    onClick={() => {
                      if (answers[currentQuestion]) {
                        setShowResults(true);
                      }
                    }}
                    disabled={!answers[currentQuestion]}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    View Results
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      if (answers[currentQuestion]) {
                        setCurrentQuestion(currentQuestion + 1);
                      }
                    }}
                    disabled={!answers[currentQuestion]}
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="p-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-between items-center mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setShowQuiz(false);
                    setShowResults(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Explorer
                </Button>
                <div></div> {/* Spacer for center alignment */}
              </div>
              <CardTitle className="text-3xl mb-4">Your Career Interest Results</CardTitle>
              <CardDescription className="text-lg">
                Based on your responses, here are your career field recommendations:
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {(() => {
                // Calculate scores for each category
                const categoryScores = {
                  STEM: 0,
                  Arts: 0,
                  Business: 0,
                  Social: 0,
                  Sports: 0,
                  Communication: 0
                };

                answers.forEach((answer, index) => {
                  if (answer !== undefined && answer !== "") {
                    const answerIndex = parseInt(answer);
                    const category = careerQuizQuestions[index].category[answerIndex];
                    categoryScores[category] = (categoryScores[category] || 0) + 1;
                  }
                });

                // Sort categories by score
                const sortedCategories = Object.entries(categoryScores)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3);

                return (
                  <div className="space-y-6">
                    {sortedCategories.map(([category, score], index) => (
                      <div key={category} className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-semibold">
                            #{index + 1} {category} Fields
                          </h3>
                          <Badge variant="secondary">
                            {score} matches
                          </Badge>
                        </div>
                        <Progress value={(score / 25) * 100} className="h-2 mb-3" />
                        <p className="text-muted-foreground">
                          You show strong interest in {category.toLowerCase()}-related careers.
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })()}

              <div className="flex justify-center space-x-4 pt-6">
                <Button
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setAnswers([]);
                  }}
                  variant="outline"
                >
                  Retake Quiz
                </Button>
                <Button
                  onClick={() => {
                    setShowQuiz(false);
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setAnswers([]);
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Explore Career Fields
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CareerExplorer;
