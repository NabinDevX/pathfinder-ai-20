import React, { useState } from "react";
import { Target, Clock, BookOpen, Brain, Calendar, CheckCircle, Star, Timer, Award, Play, Pause, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DashboardLayout from "@/components/DashboardLayout";

const StudySmart = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);
  const [showPomodoroPopup, setShowPomodoroPopup] = useState(false);
  const [pomodoroSession, setPomodoroSession] = useState({
    timeLeft: 25 * 60, // 25 minutes in seconds
    isActive: false,
    isBreak: false,
    sessionCount: 0
  });

  const studyTechniques = [
    {
      id: "pomodoro",
      title: "Pomodoro Technique",
      description: "Break study time into focused 25-minute sessions",
      difficulty: "Beginner",
      timeRequired: "25 min sessions",
      icon: Timer,
      color: "from-red-500 to-pink-500",
      benefits: ["Better focus", "Reduced fatigue", "Time awareness", "Regular breaks"],
      steps: [
        "Set timer for 25 minutes",
        "Study without any distractions",
        "Take a 5-minute break",
        "Repeat 3-4 times, then take longer break"
      ],
      completed: true,
      rating: 4.8
    },
    {
      id: "active-recall",
      title: "Active Recall",
      description: "Test yourself frequently instead of just re-reading",
      difficulty: "Medium",
      timeRequired: "Varies",
      icon: Brain,
      color: "from-blue-500 to-purple-500",
      benefits: ["Better retention", "Identifies weak spots", "Builds confidence", "Efficient learning"],
      steps: [
        "Read the material once",
        "Close your book/notes",
        "Try to recall key points",
        "Check and fill gaps"
      ],
      completed: false,
      rating: 4.9
    },
    {
      id: "spaced-repetition",
      title: "Spaced Repetition",
      description: "Review material at increasing intervals",
      difficulty: "Medium",
      timeRequired: "15-30 min daily",
      icon: Calendar,
      color: "from-green-500 to-teal-500",
      benefits: ["Long-term retention", "Efficient review", "Prevents forgetting", "Builds mastery"],
      steps: [
        "Learn new material",
        "Review after 1 day",
        "Review after 3 days",
        "Review after 1 week, 2 weeks, 1 month"
      ],
      completed: false,
      rating: 4.7
    },
    {
      id: "feynman",
      title: "Feynman Technique",
      description: "Explain concepts in simple terms as if teaching someone",
      difficulty: "Advanced",
      timeRequired: "30-45 min",
      icon: BookOpen,
      color: "from-orange-500 to-yellow-500",
      benefits: ["Deep understanding", "Identifies gaps", "Improves communication", "Builds mastery"],
      steps: [
        "Choose a concept to learn",
        "Explain it in simple terms",
        "Identify gaps in understanding",
        "Go back and re-learn weak areas"
      ],
      completed: false,
      rating: 4.6
    }
  ];

  const timeManagementTips = [
    {
      title: "Plan Your Day",
      description: "Use a daily planner to organize tasks by priority",
      icon: Calendar,
      difficulty: "Easy"
    },
    {
      title: "Use the 2-Minute Rule",
      description: "If a task takes less than 2 minutes, do it immediately",
      icon: Clock,
      difficulty: "Easy"
    },
    {
      title: "Time Blocking",
      description: "Assign specific time slots to different subjects",
      icon: Target,
      difficulty: "Medium"
    },
    {
      title: "Eliminate Distractions",
      description: "Keep your phone away and use website blockers",
      icon: Brain,
      difficulty: "Medium"
    }
  ];

  const studyHabits = [
    { habit: "Study at the same time daily", completed: true, streak: 12 },
    { habit: "Take notes by hand", completed: true, streak: 8 },
    { habit: "Review previous day's work", completed: false, streak: 0 },
    { habit: "Use active recall techniques", completed: false, streak: 0 },
    { habit: "Take regular breaks", completed: true, streak: 15 }
  ];

  return (
    <DashboardLayout 
      title="Study Smart Program" 
      description="Master effective study techniques and time management skills"
    >
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Smart Study Techniques 🧠
          </h2>
          <p className="text-muted-foreground mb-4">
            Learn scientifically-proven study methods that will make your learning more efficient and effective.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Techniques Mastered</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-secondary">25%</div>
              <div className="text-sm text-muted-foreground">Study Time Saved</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-accent">15</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="techniques" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="techniques">Study Techniques</TabsTrigger>
            <TabsTrigger value="time-management">Time Management</TabsTrigger>
            <TabsTrigger value="habits">Study Habits</TabsTrigger>
          </TabsList>

          <TabsContent value="techniques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyTechniques.map((technique) => (
                <Card 
                  key={technique.id}
                  className={`hover:shadow-lg transition-all cursor-pointer ${
                    selectedTechnique === technique.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedTechnique(selectedTechnique === technique.id ? null : technique.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${technique.color} flex items-center justify-center`}>
                        <technique.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex gap-2">
                        {technique.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Mastered
                          </Badge>
                        )}
                        <Badge variant="outline">{technique.difficulty}</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{technique.title}</CardTitle>
                    <CardDescription>{technique.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {technique.timeRequired}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {technique.rating}
                        </span>
                      </div>
                      
                      {selectedTechnique === technique.id && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Benefits:</h4>
                            <div className="flex flex-wrap gap-1">
                              {technique.benefits.map((benefit, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">How to do it:</h4>
                            <ol className="text-sm space-y-1">
                              {technique.steps.map((step, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-primary font-medium">{index + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        className="w-full" 
                        variant={technique.completed ? "outline" : "default"}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (technique.id === "pomodoro") {
                            if (selectedTechnique === technique.id) {
                              // If already expanded, start the Pomodoro session
                              setShowPomodoroPopup(true);
                            } else {
                              // If not expanded, expand the section
                              setSelectedTechnique(technique.id);
                            }
                          }
                        }}
                      >
                        {technique.completed && technique.id === "pomodoro" && selectedTechnique === technique.id 
                          ? "Start" 
                          : technique.completed 
                          ? "Practice Again" 
                          : "Start Learning"
                        }
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="time-management" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {timeManagementTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <tip.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                        <Badge variant="outline" className="mt-1">{tip.difficulty}</Badge>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{tip.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Learn This Technique</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Daily Schedule Template</CardTitle>
                <CardDescription>A suggested schedule for effective study planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: "6:00 AM", activity: "Wake up & Morning routine", color: "bg-blue-100" },
                    { time: "7:00 AM", activity: "Breakfast & Review yesterday's notes", color: "bg-green-100" },
                    { time: "8:00 AM", activity: "School/Classes", color: "bg-purple-100" },
                    { time: "4:00 PM", activity: "Lunch & Break", color: "bg-yellow-100" },
                    { time: "5:00 PM", activity: "Homework & New topics", color: "bg-blue-100" },
                    { time: "7:00 PM", activity: "Dinner & Family time", color: "bg-green-100" },
                    { time: "8:00 PM", activity: "Practice & Problem solving", color: "bg-purple-100" },
                    { time: "9:30 PM", activity: "Review & Next day planning", color: "bg-orange-100" },
                    { time: "10:00 PM", activity: "Relax & Sleep", color: "bg-gray-100" }
                  ].map((item, index) => (
                    <div key={index} className={`p-3 rounded-lg ${item.color} flex justify-between`}>
                      <span className="font-medium">{item.time}</span>
                      <span>{item.activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="habits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Study Habits Progress</CardTitle>
                <CardDescription>Track and build consistent study habits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyHabits.map((habit, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          habit.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {habit.completed && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span className="font-medium">{habit.habit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {habit.streak > 0 && (
                          <Badge variant="secondary">
                            <Award className="w-3 h-3 mr-1" />
                            {habit.streak} days
                          </Badge>
                        )}
                        <Button size="sm" variant="outline">
                          {habit.completed ? "Reset" : "Start"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Study Environment Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Perfect Study Space:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Good lighting (natural light preferred)</li>
                      <li>• Comfortable chair and desk height</li>
                      <li>• Minimal distractions</li>
                      <li>• All materials within reach</li>
                      <li>• Comfortable temperature</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">What to Avoid:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Studying on bed (makes you sleepy)</li>
                      <li>• Background music with lyrics</li>
                      <li>• Phone within easy reach</li>
                      <li>• Studying when hungry or tired</li>
                      <li>• Cramming before exams</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Pomodoro Practice Popup */}
        <Dialog open={showPomodoroPopup} onOpenChange={setShowPomodoroPopup}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-red-500" />
                Pomodoro Session
              </DialogTitle>
              <DialogDescription>
                {pomodoroSession.isBreak ? "Take a short break!" : "Focus time - stay concentrated!"}
              </DialogDescription>
            </DialogHeader>
            <PomodoroTimer 
              session={pomodoroSession}
              setSession={setPomodoroSession}
              onClose={() => setShowPomodoroPopup(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

// Pomodoro Timer Component
const PomodoroTimer = ({ session, setSession, onClose }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setSession(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const resetTimer = () => {
    setSession(prev => ({
      ...prev,
      timeLeft: prev.isBreak ? 5 * 60 : 25 * 60,
      isActive: false
    }));
  };

  const skipSession = () => {
    if (session.isBreak) {
      // End break, start new work session
      setSession(prev => ({
        ...prev,
        timeLeft: 25 * 60,
        isBreak: false,
        isActive: false
      }));
    } else {
      // End work session, start break
      const newSessionCount = session.sessionCount + 1;
      const isLongBreak = newSessionCount % 4 === 0;
      setSession(prev => ({
        ...prev,
        timeLeft: isLongBreak ? 15 * 60 : 5 * 60,
        isBreak: true,
        isActive: false,
        sessionCount: newSessionCount
      }));
    }
  };

  // Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (session.isActive && session.timeLeft > 0) {
      interval = setInterval(() => {
        setSession(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (session.timeLeft === 0) {
      // Auto-switch to break or work
      skipSession();
    }

    return () => clearInterval(interval);
  }, [session.isActive, session.timeLeft]);

  const progress = session.isBreak 
    ? ((5 * 60 - session.timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - session.timeLeft) / (25 * 60)) * 100;

  return (
    <div className="space-y-6 py-4">
      {/* Timer Display */}
      <div className="text-center">
        <div className="text-6xl font-mono font-bold text-primary mb-2">
          {formatTime(session.timeLeft)}
        </div>
        <div className="text-sm text-muted-foreground">
          Session {session.sessionCount + 1} • {session.isBreak ? 'Break Time' : 'Focus Time'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="text-xs text-center text-muted-foreground">
          {session.isBreak ? 'Break Progress' : 'Focus Progress'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTimer}
          className="flex items-center gap-2"
        >
          {session.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {session.isActive ? 'Pause' : 'Start'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={resetTimer}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={skipSession}
          className="flex items-center gap-2"
        >
          Skip
        </Button>
      </div>

      {/* Session Stats */}
      <div className="text-center text-sm text-muted-foreground">
        <div>Completed Sessions: {session.sessionCount}</div>
        <div className="mt-2">
          Next: {session.isBreak ? 'Focus Session' : 'Break Time'}
        </div>
      </div>

      {/* Close Button */}
      <div className="text-center pt-2">
        <Button variant="ghost" size="sm" onClick={onClose}>
          End Session
        </Button>
      </div>
    </div>
  );
};

export default StudySmart;
