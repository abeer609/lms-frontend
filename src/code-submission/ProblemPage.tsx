import { useEffect, useState } from "react";
import {
    Play,
    Check,
    X,
    Clock,
    BookOpen,
    MessageSquare,
    Loader2,
} from "lucide-react";
import CodeEditor from "./components/CodeEditor";
import ProbleDescription from "./components/ProbleDescription";
import { useParams } from "react-router";
import useProblem from "./hooks/useProblem";
import { decodeBase64, encodeBase64 } from "./utils";
import {
    type Language,
    type IconType,
    DEFAULT_LANGUAGES,
    type Token,
    type SubmissionResponse,
    type SubmissionResult,
} from "./schema";
import axios, { AxiosError } from "axios";
import TestCase from "./components/TestCase";
import { client } from "../client";
import { useAppSelector } from "../hooks";
import { SidebarLayoutContent } from "../components/sidebar-layout";
import {
    Breadcrumb,
    BreadcrumbHome,
    Breadcrumbs,
    BreadcrumbSeparator,
} from "../components/breadcrumbs";

interface TabButtonProps {
    id: string;
    icon: IconType;
    label: string;
    active: boolean;
}

const ProblemPage = () => {
    const { id } = useParams();
    if (!id) {
        return;
    }
    const { data: problem, isLoading } = useProblem(id);
    const token = useAppSelector((state) => state.authReducer.access);
    const isAuthenticated = useAppSelector(
        (state) => state.authReducer.isAuthenticated,
    );
    const [activeTab, setActiveTab] = useState("description");
    const [isSubmitting, setIsSubmitting] = useState(false); // Add this state variable t
    const [isTestCaseRunning, setIsTestCaseRunning] = useState(false);
    const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGES[0]);
    const [submissions, setSubmissions] = useState<SubmissionResult[]>();
    const [selectedTestCase, setSelectedTestCase] =
        useState<SubmissionResult>();
    const [tokens, setTokens] = useState<string[]>();
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!problem) return;
        setCode(problem.code_submissions?.code || "");
    }, [problem]);

    const [code, setCode] = useState("");

    const handleCodeSubmission = async () => {
        if (!submissions || !problem || !code) {
            return;
        }
        const data = {
            problem: problem.id,
            code: code,
            testcase_results: problem.test_cases.map((test_case, idx) => ({
                test_case: test_case.id,
                status: submissions[idx].status_id,
            })),
        };
        setIsSubmitting(true);
        try {
            await client.post("/code-submissions/", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
            if (error instanceof AxiosError) alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLanguageChange = (newLang: number) => {
        const filteredLanguage = DEFAULT_LANGUAGES.filter(
            (language) => language.id == newLang,
        );
        setLanguage(filteredLanguage[0]);
    };

    const runCode = async () => {
        if (!problem) {
            return;
        }
        setIsRunning(true);
        const submissions = problem.test_cases.map((test_case) => ({
            source_code: encodeBase64(code),
            language_id: language.id,
            stdin: encodeBase64(test_case.stdin),
            expected_output: encodeBase64(test_case.output),
        }));

        const options = {
            method: "POST",
            url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
            params: {
                base64_encoded: "true",
            },
            headers: {
                "x-rapidapi-key": import.meta.env.JUDGE_KEY,
                "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                "Content-Type": "application/json",
            },
            data: {
                submissions,
            },
        };

        try {
            const response = await axios.request<Token[]>(options);
            setTokens(response.data.map((token) => token.token));
            setIsRunning(false);
        } catch (error) {
            console.error(error);
            setIsRunning(false);
        } finally {
            setIsRunning(false);
        }
    };

    useEffect(() => {
        if (!tokens) return;

        let intervalId: number;
        const fetchSubmissions = async () => {
            if (!tokens) {
                return;
            }
            setIsTestCaseRunning(true);
            const options = {
                method: "GET",
                url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
                params: {
                    tokens: tokens.join(","),
                    base64_encoded: "true",
                    fields: "*",
                },
                headers: {
                    "x-rapidapi-key":
                        "8ae39f33f8msh2a6274b1538ca7cp195e00jsn16c32cde4b26",
                    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                },
            };

            try {
                const response =
                    await axios.request<SubmissionResponse>(options);
                const submissionRes = response.data.submissions;
                if (
                    submissionRes.every(
                        (submission) =>
                            submission.status_id != 2 &&
                            submissionRes.every(
                                (submission) => submission.status_id != 1,
                            ),
                    )
                ) {
                    clearInterval(intervalId);
                    setSubmissions(submissionRes);
                    setSelectedTestCase(submissionRes[0]);
                    setIsTestCaseRunning(false);
                }
            } catch (error) {
                console.error(error);
                clearInterval(intervalId);
                setIsTestCaseRunning(false);
            }
        };
        fetchSubmissions();
        intervalId = setInterval(fetchSubmissions, 5000);
        return () => clearInterval(intervalId);
    }, [tokens]);

    const renderTestCasePane = () => {
        if (isTestCaseRunning) {
            return (
                <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="animate-spin" size={16} />
                    Running test cases...
                </div>
            );
        } else if (!isTestCaseRunning && !submissions) {
            return (
                <div className="flex items-center gap-2 text-gray-400">
                    No submissions
                </div>
            );
        } else if (submissions && selectedTestCase) {
            return (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        Accepted{" "}
                        {`${submissions.filter((sub) => sub.status_id == 3).length} / ${
                            submissions.length
                        }`}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {submissions.map((submission, idx) => (
                            <div key={submission.token} className="text-center">
                                <button
                                    onClick={() => {
                                        const selectedSubmission =
                                            submissions.find(
                                                (sub) =>
                                                    sub.token ==
                                                    submission.token,
                                            );
                                        if (!selectedSubmission) return;
                                        setSelectedTestCase(selectedSubmission);
                                    }}
                                    className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center text-xs font-medium ${
                                        submission.status_id == 3
                                            ? "bg-green-600 text-white"
                                            : "bg-red-600 text-white"
                                    }`}
                                >
                                    {submission.status_id === 3 ? (
                                        <Check size={14} />
                                    ) : (
                                        <X size={14} />
                                    )}
                                </button>
                                <div className="text-sm text-gray-400">
                                    Case {idx + 1}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 text-sm">
                        <div>
                            <div className="text-gray-400 mb-1 font-medium">
                                Input
                            </div>
                            <div className="bg-gray-900 p-3 rounded text-gray-300 font-mono  border border-gray-700">
                                <p className="whitespace-pre font-mono">
                                    {selectedTestCase.stdin
                                        ? decodeBase64(selectedTestCase.stdin)
                                        : ""}
                                </p>
                            </div>
                        </div>

                        <TestCase selectedSubmission={selectedTestCase} />

                        <div>
                            <div className="text-gray-400 mb-1 font-medium">
                                Expected
                            </div>
                            <div className="bg-gray-900 p-3 rounded text-gray-300 font-mono  border border-gray-700">
                                <p className="whitespace-pre font-mono">
                                    {selectedTestCase.expected_output
                                        ? decodeBase64(
                                              selectedTestCase.expected_output,
                                          )
                                        : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    const TabButton = ({ id, icon: Icon, label, active }: TabButtonProps) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                active ? "text-orange-400" : "text-gray-400 hover:text-gray-300"
            }`}
        >
            <Icon size={16} />
            {label}
        </button>
    );

    const renderProbelm = () => {
        if (isLoading) {
            return <p>problem is loading...</p>;
        } else if (!isLoading && !problem) {
            return <p>No probelm</p>;
        } else if (!isLoading && problem) {
            return <ProbleDescription problem={problem} />;
        }
    };

    return (
        <SidebarLayoutContent
            breadcrumbs={
                <Breadcrumbs>
                    <BreadcrumbHome />
                    <BreadcrumbSeparator className="max-md:hidden" />
                    <Breadcrumb className="max-md:hidden" href="/problems/">
                        Problems
                    </Breadcrumb>
                    <BreadcrumbSeparator />
                    <Breadcrumb>{problem?.id}</Breadcrumb>
                </Breadcrumbs>
            }
        >
            <div>
                <div className="md:flex">
                    {/* Left Panel - Problem Description */}
                    <div className="md:w-1/2 md:border-r border-gray-700 flex flex-col md:h-screen overflow-hidden">
                        <div className="border-b border-l border-t py-[12px] border-gray-700">
                            <nav className="flex">
                                <TabButton
                                    id="description"
                                    icon={BookOpen}
                                    label="Description"
                                    active={activeTab === "description"}
                                />
                                <TabButton
                                    id="submissions"
                                    icon={MessageSquare}
                                    label="Submissions"
                                    active={activeTab === "submissions"}
                                />
                            </nav>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {activeTab === "description" && renderProbelm()}
                            {activeTab === "submissions" && (
                                <div className="text-gray-300">
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        Recent Submissions
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                                            <div className="flex items-center gap-3">
                                                <Check
                                                    className="text-green-400"
                                                    size={16}
                                                />
                                                <span className="text-green-400">
                                                    Accepted
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                <span>Python3</span> •{" "}
                                                <span>2 ms</span> •{" "}
                                                <span>2 hours ago</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                                            <div className="flex items-center gap-3">
                                                <X
                                                    className="text-red-400"
                                                    size={16}
                                                />
                                                <span className="text-red-400">
                                                    Wrong Answer
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                <span>Python3</span> •{" "}
                                                <span>3 hours ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Code Editor */}
                    <div className="md:w-1/2 flex flex-col md:h-screen overflow-hidden">
                        {/* Code Editor Header */}
                        <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex flex-wrap lg:flex-nowrap items-center gap-2">
                            <select
                                value={language.id}
                                onChange={(e) =>
                                    handleLanguageChange(
                                        parseInt(e.target.value),
                                    )
                                }
                                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                {DEFAULT_LANGUAGES.map((language) => (
                                    <option
                                        key={language.id}
                                        value={language.id}
                                    >
                                        {language.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={runCode}
                                disabled={isRunning}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded text-sm transition-colors"
                            >
                                {isRunning ? (
                                    <Clock className="animate-spin" size={16} />
                                ) : (
                                    <Play size={16} />
                                )}
                                {isRunning ? "Running..." : "Run"}
                            </button>
                            {isAuthenticated && submissions && (
                                <button
                                    onClick={handleCodeSubmission}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors font-medium flex gap-2"
                                >
                                    Submit
                                    {isSubmitting && (
                                        <Loader2 className="animate-spin h-6 w-6" />
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Code Editor */}
                        <div className="relative">
                            <CodeEditor
                                setCode={setCode}
                                language={language}
                                code={problem?.code_submissions?.code || ""}
                            />
                        </div>

                        {/* Test Results Panel */}
                        <div className="border-t border-gray-700 overflow-y-auto">
                            <div className="border-b border-gray-700 px-4 py-3">
                                <div className="flex items-center gap-4">
                                    <button className="text-sm text-orange-400 font-medium border-b-2 border-orange-400 pb-1">
                                        Testcase
                                    </button>
                                </div>
                            </div>

                            {/* test case */}
                            <div className="p-4 overflow-y-auto">
                                {renderTestCasePane()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayoutContent>
    );
};

export default ProblemPage;
