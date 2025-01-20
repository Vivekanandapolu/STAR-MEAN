import jwt from "jsonwebtoken";
import { checkRole } from "../middlewares/roleValidatio.js";

export class TokenController {
  async generateToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1h",
    });

    return token;
  }

  //Verify the token that is provided in the request headers
  async verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return next({
          status: 403,
          success: false,
          message: "Forbidden / Token not found ",
        });
      }

      jwt.verify(token, process.env.SECRET, (err, decode) => {
        if (err) {
          return next({
            status: 401,
            message: err.message?.includes("jwt expired")
              ? "UnAuthorized Access Token Expired"
              : "Invalid Token Provided",
          });
        }
        req.user = decode;
        next();
      });
    } catch (error) {
      next(error);
    }
  }
}

const tokenController = new TokenController();

export function tokenAndRoleMiddlewares() {
  return [tokenController.verifyToken, checkRole("admin")];
}
