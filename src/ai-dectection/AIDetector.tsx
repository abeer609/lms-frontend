import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, FileText, Loader2, AlertCircle, CheckCircle, Brain } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { client } from '../client';
import Header from '../components/Header';

// Validation schema

const MAXCHARS = 600
const aiDetectorSchema = z.object({
  text: z.string()
    .min(300, 'Text must be at least 300 characters long for accurate detection')
    .max(600, `Text must be less than ${MAXCHARS} characters`),
});

type AIDetectorFormData = z.infer<typeof aiDetectorSchema>;


interface DetectionResult{
    ai_score: number
    human_score: number
}
const AIDetector: React.FC = () => {
  const [detectionResult, setDetectionResult] = useState<DetectionResult>();
  const [error, setError] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<AIDetectorFormData>({
    resolver: zodResolver(aiDetectorSchema),
    mode: 'onChange',
  });

  const watchedText = watch('text', '');

  const analyzeText = async (data: AIDetectorFormData) => {
    setIsAnalyzing(true);
    client.post<{score:number}>('/hello/', {text:data.text})
    .then(res=>{
        setDetectionResult({...detectionResult, ai_score: 100 - res.data.score, human_score: res.data.score})
    }).catch(e=>{
        if(e instanceof AxiosError){
            setError(e.message)
        }
    }).finally(()=>{
        setIsAnalyzing(false)
    })
    // try {
    //   // Simulate API call to AI detection service
    //   await new Promise(resolve => setTimeout(resolve, 2000));
      
    //   // Mock AI detection logic (replace with actual API call)
    //   const textLength = data.text.length;
    //   const wordCount = data.text.split(/\s+/).length;
    //   const avgWordLength = data.text.replace(/\s/g, '').length / wordCount;
      
    //   // Simple heuristic for demo (replace with actual AI detection API)
    //   const repetitivePatterns = (data.text.match(/\b(\w+)\s+\1\b/gi) || []).length;
    //   const complexSentences = data.text.split(/[.!?]+/).filter(s => s.split(',').length > 3).length;
    //   const commonAIWords = ['furthermore', 'moreover', 'additionally', 'consequently', 'therefore'].filter(word => 
    //     data.text.toLowerCase().includes(word)
    //   ).length;
      
    //   // Calculate mock scores
    //   let aiScore = Math.min(95, Math.max(5, 
    //     (repetitivePatterns * 15) + 
    //     (commonAIWords * 12) + 
    //     (avgWordLength > 6 ? 20 : 0) + 
    //     (complexSentences * 8) +
    //     Math.random() * 30
    //   ));
      
    //   const humanScore = 100 - aiScore;
    //   const confidence = Math.min(95, Math.max(60, 85 + Math.random() * 10));

    //   const mockResult: DetectionResult = {
    //     aiScore: Math.round(aiScore),
    //     humanScore: Math.round(humanScore),
    //     confidence: Math.round(confidence),
    //     analysis: {
    //       patterns: [
    //         repetitivePatterns > 0 ? 'Repetitive word patterns detected' : 'Natural word variation',
    //         commonAIWords > 2 ? 'High frequency of AI-typical transitions' : 'Natural language flow',
    //         avgWordLength > 6 ? 'Complex vocabulary usage' : 'Standard vocabulary complexity',
    //         complexSentences > 2 ? 'Highly structured sentences' : 'Natural sentence structure'
    //       ].filter(Boolean),
    //       indicators: [
    //         aiScore > 70 ? 'Strong AI writing patterns' : 'Human-like writing style',
    //         confidence > 80 ? 'High confidence in detection' : 'Moderate confidence level',
    //         wordCount > 200 ? 'Sufficient text for analysis' : 'Limited text sample'
    //       ]
    //     }
    //   };

    //   setDetectionResult(mockResult);
      
    // } catch (error) {
    //   console.error('Analysis error:', error);
    //   alert('Failed to analyze text. Please try again.');
    // } finally {
    //   setIsAnalyzing(false);
    // }
  };
  console.log(detectionResult)


  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 70) return 'bg-red-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <>
    <Header currentPage='ai-detector'></Header>
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Brain className="w-12 h-12 text-indigo-400 mr-3" />
            <h1 className="text-4xl font-extrabold tracking-wide">
              <span className="text-indigo-400">AI</span>
              <span className="text-white">Detector</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Analyze text to determine if it was written by AI or human. Get detailed insights and confidence scores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <form onSubmit={handleSubmit(analyzeText)} className="space-y-6">
              
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-200 mb-2">
                  <FileText className="inline w-4 h-4 mr-2" />
                  Text to Analyze
                </label>
                <textarea
                  id="text"
                  rows={12}
                  placeholder="Paste your text here for AI detection analysis. Minimum 50 characters required for accurate results..."
                  className={`w-full rounded-md bg-gray-900 px-3 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors resize-none ${
                    errors.text 
                      ? 'border border-red-500 focus:ring-red-500' 
                      : 'focus:ring-indigo-500'
                  }`}
                  disabled={isAnalyzing}
                  {...register('text')}
                />
                
                {/* Character Count */}
                <div className="flex justify-between items-center mt-2">
                  <div>
                    {errors.text && (
                      <p className="text-sm text-red-400">{errors.text.message}</p>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">
                    {watchedText.length} / {MAXCHARS} characters
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !isValid || watchedText.length < 50}
                className="w-full flex justify-center items-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Text...
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-2" />
                    Detect AI Content
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-indigo-400" />
              Detection Results
            </h3>

            {!detectionResult && !isAnalyzing && (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Enter text and click "Detect AI Content" to see analysis results
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12">
                <Loader2 className="w-16 h-16 text-indigo-400 mx-auto mb-4 animate-spin" />
                <p className="text-gray-300">Analyzing text patterns...</p>
                <p className="text-sm text-gray-400 mt-2">This may take a few seconds</p>
              </div>
            )}

            {detectionResult && (
              <div className="space-y-6">
                {/* Score Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Bot className="w-5 h-5 text-red-400 mr-2" />
                      <span className="text-sm font-medium text-gray-300">AI Generated</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(detectionResult.ai_score)}`}>
                      {detectionResult.ai_score.toFixed(2)}%
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${getScoreBackground(detectionResult.ai_score)}`}
                        style={{ width: `${detectionResult.ai_score}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-sm font-medium text-gray-300">Human Written</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(100 - detectionResult.human_score)}`}>
                      {detectionResult.human_score.toFixed(2)}%
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${getScoreBackground(100-detectionResult.human_score)}`}
                        style={{ width: `${detectionResult.human_score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Confidence */}


                {/* Analysis Details */}


                {/* Disclaimer */}
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-xs text-yellow-200">
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    This is a demonstration. Results are simulated and should not be used for actual AI detection purposes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AIDetector;
