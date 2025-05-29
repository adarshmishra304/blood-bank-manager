import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../utils/api";

export default function Auth() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    bloodType: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginData);
      localStorage.setItem("token", res.data.token);
      alert(`✅ Logged in as: ${loginData.email}`);
      navigate("/profile");
      setTimeout(() => window.location.reload(), 100);
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || "Login failed"));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await register(signupData);
      localStorage.setItem("token", res.data.token);
      alert(`✅ Signed up as: ${signupData.email}`);
      navigate("/profile");
      setTimeout(() => window.location.reload(), 100);
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                />
                <Input
                  type="text"
                  placeholder="Blood Type (e.g., A+, O-)"
                  value={signupData.bloodType}
                  onChange={(e) =>
                    setSignupData({ ...signupData, bloodType: e.target.value })
                  }
                  required
                />
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
