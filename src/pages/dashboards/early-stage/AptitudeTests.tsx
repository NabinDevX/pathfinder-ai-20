import { useState } from "react";
import { Brain, Clock, Star, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

const GEMINI_API_KEY = "djgwemfjeyewgfbmdfkweudywedilfjkdd"; // 🔑 put in .env

const AptitudeTests = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const aptitudeTests = [
    {
      id: "logical",
      title: "Logical Reasoning",
      description: "Test your problem-solving and analytical thinking abilities",
      duration: "30 minutes",
      questions: 25,
      difficulty: "Easy",
      completed: false,
      score: null,
      icon: Brain,
      color: "from-blue-500 to-purple-500"
    },
    {
      id: "creative",
      title: "Creative Thinking",
      description: "Discover your creative potential and innovative thinking style",
      duration: "25 minutes",
      questions: 20,
      difficulty: "Medium",
      completed: false,
      score: null,
      icon: Star,
      color: "from-pink-500 to-orange-500"
    }
  ];

  // 🔹 Fetch MCQs from Gemini
  const fetchQuestions = async (domain: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=" +
          GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate 10 multiple-choice questions in JSON for domain: ${domain}. 
                    Format: [{"question":"...","options":["A","B","C","D"],"answer":"A"}]`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();
      const text = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(text);
      setQuestions(parsed);
    } catch (e) {
      console.error("Error fetching questions:", e);
    }
    setLoading(false);
  };

  const handleStartTest = (testId: string) => {
    setSelectedTest(testId);
    fetchQuestions(testId); // fetch domain-based questions
  };

  const handleAnswer = (option: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = option;
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // calculate score
      let correct = 0;
      questions.forEach((q, i) => {
        if (updatedAnswers[i] === q.answer) correct++;
      });
      setScore((correct / questions.length) * 100);
    }
  };

  return (
    <DashboardLayout
      title="Aptitude & Personality Tests"
      description="Discover your natural strengths and learning style"
    >
      <div className="p-6 space-y-8">
        {!selectedTest ? (
          // 🔹 Show Test Cards
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aptitudeTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${test.color} flex items-center justify-center`}
                    >
                      <test.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{test.title}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleStartTest(test.id)}
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : loading ? (
          <p>Loading questions...</p>
        ) : score !== null ? (
          // 🔹 Show Results
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Test Completed!</h2>
            <p>Your Score: {score}%</p>
            <Progress value={score} className="h-2" />
            <Button onClick={() => setSelectedTest(null)}>Back to Tests</Button>
          </div>
        ) : (
          // 🔹 Quiz UI
          <div className="space-y-6">
            <h2 className="text-xl font-bold">
              Question {currentIndex + 1} of {questions.length}
            </h2>
            <p className="text-lg">{questions[currentIndex]?.question}</p>
            <div className="space-y-2">
              {questions[currentIndex]?.options.map((opt: string, i: number) => (
                <Button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="w-full justify-start"
                  variant="outline"
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AptitudeTests;
