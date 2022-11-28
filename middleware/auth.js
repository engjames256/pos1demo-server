import jwt from "jsonwebtoken";

export const authToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ msg: "No Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username, role } = decoded;
    req.user = { id, username, role };
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Not authorized to access this route" });
  }
};

export const authUser = (req, res, next) => {
  if (req.user == null) {
    return res.status(403).json({ msg: "You need to sign in" });
  }
  next();
};

export const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(401).json({ msg: "Not allowed" });
    }
    next();
  };
};
