import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LanguageSelector from "../components/LanguageSelector";

const LoginPage = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const validateUsername = (username: string): string | undefined => {
    if (!username) return t("usernameRequired");
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return t("passwordRequired");
    return undefined;
  };

  const handleSubmit = async () => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: t("loginError") });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <LanguageSelector />

        <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
          {t("title")}
        </h1>

        <div className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              {t("username")}
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  username: undefined,
                  general: undefined,
                }));
              }}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.username
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-blue-500"
              } focus:outline-none`}
              placeholder={t("username")}
            />
            {errors.username && (
              <p className='text-red-500 text-sm mt-2'>{errors.username}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              {t("password")}
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  password: undefined,
                  general: undefined,
                }));
              }}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.password
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-blue-500"
              } focus:outline-none`}
              placeholder={t("password")}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-2'>{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <div className='bg-red-50 border-2 border-red-500 rounded-lg p-4'>
              <p className='text-red-700 text-sm text-center'>
                {errors.general}
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {loading ? "..." : t("login")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
