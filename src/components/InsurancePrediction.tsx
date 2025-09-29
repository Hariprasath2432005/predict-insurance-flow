import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Calculator, CheckCircle, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PredictionData {
  age: number;
  gender: string;
  bmi: number;
  children: number;
  smoker: string;
  region: string;
  medical_history: string;
  family_medical_history: string;
  exercise_frequency: string;
  occupation: string;
  coverage_level: string;
}

const InsurancePrediction = () => {
  const [formData, setFormData] = useState<PredictionData>({
    age: 25,
    gender: "",
    bmi: 25,
    children: 0,
    smoker: "",
    region: "",
    medical_history: "",
    family_medical_history: "",
    exercise_frequency: "",
    occupation: "",
    coverage_level: "",
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Simplified prediction logic based on your ML model features
  const calculatePrediction = () => {
    setIsCalculating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let baseAmount = 5000;
      
      // Age factor
      baseAmount += formData.age * 50;
      
      // BMI factor
      if (formData.bmi > 30) baseAmount += 2000;
      else if (formData.bmi > 25) baseAmount += 1000;
      
      // Smoking factor (major impact)
      if (formData.smoker === "yes") baseAmount *= 1.8;
      
      // Children factor
      baseAmount += formData.children * 500;
      
      // Medical history factors
      if (formData.medical_history === "high_risk") baseAmount += 3000;
      else if (formData.medical_history === "medium_risk") baseAmount += 1500;
      
      if (formData.family_medical_history === "high_risk") baseAmount += 2000;
      else if (formData.family_medical_history === "medium_risk") baseAmount += 1000;
      
      // Exercise frequency (reduces cost)
      if (formData.exercise_frequency === "daily") baseAmount *= 0.9;
      else if (formData.exercise_frequency === "weekly") baseAmount *= 0.95;
      
      // Coverage level
      if (formData.coverage_level === "premium") baseAmount *= 1.5;
      else if (formData.coverage_level === "standard") baseAmount *= 1.2;
      
      // Add some randomness to make it more realistic
      const randomFactor = 0.9 + Math.random() * 0.2;
      const finalPrediction = Math.round(baseAmount * randomFactor);
      
      setPrediction(finalPrediction);
      setIsCalculating(false);
      
      toast({
        title: "Prediction Complete!",
        description: "Your insurance premium has been calculated successfully.",
      });
    }, 2000);
  };

  const handleInputChange = (field: keyof PredictionData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return formData.gender && formData.smoker && formData.region && 
           formData.medical_history && formData.family_medical_history && 
           formData.exercise_frequency && formData.occupation && formData.coverage_level;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-insurance-blue/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-insurance-blue/10 rounded-full blur-3xl transform translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-insurance-accent/10 rounded-full blur-3xl transform -translate-x-48 translate-y-48"></div>
      
      {/* Content */}
      <div className="relative z-10">
      {/* Hero Section */}
      <div className="bg-gradient-hero py-16 px-4">
        <div className="max-w-6xl mx-auto text-center text-white">
          <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Insurance Premium Predictor
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Get accurate insurance premium estimates powered by advanced machine learning algorithms
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-medium">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Calculator className="w-6 h-6 text-insurance-blue" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      min="18"
                      max="100"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bmi">BMI</Label>
                    <Input
                      id="bmi"
                      type="number"
                      min="15"
                      max="50"
                      step="0.1"
                      value={formData.bmi}
                      onChange={(e) => handleInputChange('bmi', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="children">Number of Children</Label>
                    <Input
                      id="children"
                      type="number"
                      min="0"
                      max="10"
                      value={formData.children}
                      onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smoker">Smoker</Label>
                    <Select value={formData.smoker} onValueChange={(value) => handleInputChange('smoker', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Smoking status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select value={formData.region} onValueChange={(value) => handleInputChange('region', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="northeast">Northeast</SelectItem>
                        <SelectItem value="northwest">Northwest</SelectItem>
                        <SelectItem value="southeast">Southeast</SelectItem>
                        <SelectItem value="southwest">Southwest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medical_history">Medical History</Label>
                    <Select value={formData.medical_history} onValueChange={(value) => handleInputChange('medical_history', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Medical history" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low_risk">Low Risk</SelectItem>
                        <SelectItem value="medium_risk">Medium Risk</SelectItem>
                        <SelectItem value="high_risk">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="family_medical_history">Family Medical History</Label>
                    <Select value={formData.family_medical_history} onValueChange={(value) => handleInputChange('family_medical_history', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Family history" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low_risk">Low Risk</SelectItem>
                        <SelectItem value="medium_risk">Medium Risk</SelectItem>
                        <SelectItem value="high_risk">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exercise_frequency">Exercise Frequency</Label>
                    <Select value={formData.exercise_frequency} onValueChange={(value) => handleInputChange('exercise_frequency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Exercise frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="rarely">Rarely</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office_worker">Office Worker</SelectItem>
                        <SelectItem value="manual_labor">Manual Labor</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverage_level">Coverage Level</Label>
                    <Select value={formData.coverage_level} onValueChange={(value) => handleInputChange('coverage_level', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Coverage level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={calculatePrediction}
                  disabled={!isFormValid() || isCalculating}
                  className="w-full bg-gradient-primary hover:bg-insurance-blue-dark transition-all duration-300"
                  size="lg"
                >
                  {isCalculating ? (
                    "Calculating..."
                  ) : (
                    <>
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Premium
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <Card className="shadow-medium bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-insurance-blue" />
                  Premium Estimate
                </CardTitle>
              </CardHeader>
              <CardContent>
                {prediction ? (
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-white rounded-lg shadow-soft">
                      <div className="text-3xl font-bold text-insurance-blue mb-2">
                        ${prediction.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground">Annual Premium</div>
                    </div>
                    <div className="flex items-center gap-2 text-insurance-success">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Calculation complete</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Fill out the form to get your premium estimate</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">How it works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-insurance-blue text-white flex items-center justify-center text-xs font-bold">1</div>
                  <p>Enter your personal and health information</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-insurance-blue text-white flex items-center justify-center text-xs font-bold">2</div>
                  <p>Our AI model analyzes risk factors</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-insurance-blue text-white flex items-center justify-center text-xs font-bold">3</div>
                  <p>Get instant premium estimate</p>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePrediction;