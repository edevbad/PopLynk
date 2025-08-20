import jwt from "jsonwebtoken";

export default function authMiddleWare(req, res, next) {
  const token = req.cookies.accessToken;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);    
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
