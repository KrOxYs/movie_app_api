// associations.js
import sequelize from "../config/dbConfig.js";
import Category from "./Category.js";
import Movie from "./Movie.js";
import Genre from "./Genre.js";
import Cast from "./Cast.js";
import Director from "./Director.js";
import MovieDirectors from "./MovieDirectors.js";
import MovieCast from "./MovieCast.js";
import MovieGenre from "./MovieGenre.js";
import User from "./Auth/User.js";
import Package from "./Package/Package.js";
import PackageDetail from "./Package/PackageDetail.js";
import Voucher from "./Voucher/Voucher.js";
import Subscription from "./Subscription/Subscription.js";

// Catgory and Movie association
Category.hasOne(Movie, { foreignKey: "categoryID" });
Movie.belongsTo(Category, { foreignKey: "categoryID" });

// Genre and Movie association
Genre.belongsToMany(Movie, { through: MovieGenre, foreignKey: "genre_id" });
Movie.belongsToMany(Genre, { through: MovieGenre, foreignKey: "movie_id" });

// Movie and Cast association
Cast.belongsToMany(Movie, { through: MovieCast, foreignKey: "cast_id" });
Movie.belongsToMany(Cast, { through: MovieCast, foreignKey: "movie_id" });

// Movie and Directors association
Director.belongsToMany(Movie, {
  through: MovieDirectors,
  foreignKey: "director_id",
});
Movie.belongsToMany(Director, {
  through: MovieDirectors,
  foreignKey: "movie_id",
});

// Package and PackageDetail association
Package.hasMany(PackageDetail, { foreignKey: "package_id" });
PackageDetail.belongsTo(Package, { foreignKey: "package_id" });

// Subscription and Package association
Package.hasOne(Subscription, { foreignKey: "package_id" });
Subscription.belongsTo(Package, { foreignKey: "package_id" });

// Subscription and User association
User.hasMany(Subscription, { foreignKey: "customer_id" });
Subscription.belongsTo(User, { foreignKey: "customer_id" });

// Optionally export sequelize or any other setup you might need
export {
  sequelize,
  Category,
  Movie,
  Genre,
  MovieGenre,
  Cast,
  MovieCast,
  Director,
  MovieDirectors,
  User,
  Package,
  PackageDetail,
  Voucher,
  Subscription,
};
