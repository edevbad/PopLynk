import { createUser, verifyUser, signToken ,findUserById, verifyToken} from "../services/auth.service.js";


const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await createUser(username, email, password);
  if (!user) return res.status(409).json({ msg: `User already exists` });

  const token = await signToken(user._id);
  // 🔹 Store token in HTTP-only cookie
  res.cookie("accessToken", token, {
    httpOnly: true, // Cannot be accessed via JS
    secure: true, // Set to true in production with HTTPS
    sameSite: "none",
    maxAge: 60 * 60 * 1000, // 20 minutes
  });

  return res.status(201).json({ msg: `Account Created Successfully`, user });
};

const authorizeUser = async (req, res) => {
  const token = req.cookies.accessToken;
  try {
    const decoded = verifyToken(token);
    const id = decoded.id;    
    const user = await findUserById(id);    
     res.status(200).json({ authenticated: true,user });
  } catch (err) {
    res.status(200).json({ authenticated: false,user:null });
  } 
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await verifyUser(email, password);
  if (!user) return res.status(401).json({ msg: `invalid Credentials` });

  const token = await signToken(user._id);

  // 🔹 Store token in HTTP-only cookie
  res.cookie("accessToken", token, {
    httpOnly: true, // Cannot be accessed via JS
    secure: true, // Set to true in production with HTTPS
    sameSite: "none",
    maxAge: 60 * 60 * 1000, // 20 minutes
  });

  return res.json({ msg: `Login Successfull`, user });
};

export { RegisterUser, LoginUser, authorizeUser };
