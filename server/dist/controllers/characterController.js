"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInitialTimePatch = exports.updateLeaderBoardPut = exports.validateLocationPost = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const character_1 = __importDefault(require("../models/character"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.validateLocationPost = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { character, pageX, pageY } = req.body;
        let characters = await character_1.default.find({});
        const validateLocation = () => {
            for (let i = 0; i < characters.length; i += 1) {
                if (pageX >= characters[i].locationXMin &&
                    pageX <= characters[i].locationXMax &&
                    pageY >= characters[i].locationYMin &&
                    pageY <= characters[i].locationYMax &&
                    character === characters[i].name) {
                    return true;
                }
            }
            return false;
        };
        res.json({
            success: validateLocation(),
        });
    }
    catch (error) {
        res.status(500).json({ Message: error, success: false });
    }
});
const toTime = (elapsedTime) => {
    const date = new Date(0);
    date.setSeconds(elapsedTime);
    return date.toISOString().substr(11, 8);
};
const timeStringToNumber = time => {
    const timeString = time;
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalTimeInSeconds;
};
exports.updateLeaderBoardPut = (0, express_async_handler_1.default)(async (req, res, next) => {
    let { name, time } = req.body;
    let highscore = false;
    try {
        const topTenUsers = await user_1.default.find()
            .sort({ time: -1 })
            .collation({ locale: "en_US", numericOrdering: true }); //get the top ten users
        const lastUser = topTenUsers[0];
        console.log(time);
        console.log(app.locals.time);
        const elapsedTime = time - global.time;
        console.log(elapsedTime);
        const newUser = new user_1.default({
            username: name,
            time: toTime(elapsedTime),
        });
        if (typeof lastUser !== "undefined") {
            if (elapsedTime < timeStringToNumber(lastUser.time) &&
                topTenUsers.length >= 10) {
                console.log("this route");
                highscore = true;
                await user_1.default.findOneAndUpdate({ _id: lastUser.id }, { username: name, time: toTime(elapsedTime) }); // if the time from the client is greater than the last users time, replace it with client data
            }
            else if (topTenUsers.length < 10) {
                highscore = true;
                await newUser.save();
            }
            // highscore = false;
        }
        else {
            highscore = true;
            console.log("saving");
            await newUser.save();
        }
        // highscore = true;
        console.log("sending json");
        res.json({
            elapsedTime: toTime(elapsedTime),
            success: true,
            highscore: highscore,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ Message: error, success: false });
    }
});
exports.updateInitialTimePatch = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token;
    try {
        // Creating jwt token
        token = jsonwebtoken_1.default.sign({ userId: existingUser._id, username: existingUser.username }, process.env.signature, { expiresIn: "30m" });
    }
    catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    let { time } = req.body;
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    jsonwebtoken_1.default.verify(token[1], process.env.signature);
    console.log(token);
    try {
        console.log("initial time " + time);
        res.json({ time: time, success: true });
    }
    catch (error) {
        res.status(500).json({ Message: error, success: false });
    }
});
