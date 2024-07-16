import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../../Model/association.js";
import jwtConfig from "../../config/jwtConfig.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.secret,
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  console.log(payload);
  try {
    const user = await User.findOne({ where: { email: payload.email } });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

passport.use(strategy);

export default passport;
