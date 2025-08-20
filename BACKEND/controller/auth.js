import { createUser, verifyUser, signToken } from "../services/auth.service.js";

const RegisterUser = async (req, res) => {
  const body = req.body;
  const response = await createUser(body);
return res.json({ msg: response });

}
const LoginUser = async (req, res) => {
  const {email,password} = req.body;
  const user = await verifyUser(email,password)
  if (!user)
    return res.status(401).json({ msg: `invalid Credentials` });

  const token = await signToken(user._id);

  // 🔹 Store token in HTTP-only cookie
  res.cookie("accessToken", token, {
    httpOnly: true,   // Cannot be accessed via JS
    secure: false,    // Set to true in production with HTTPS
    sameSite: "Lax",
    maxAge: 60 * 20 * 1000 // 20 minutes
  });
  
  delete user["password"];
  return res.json({ msg: `Login Successfull` , user});
}

export { RegisterUser, LoginUser }