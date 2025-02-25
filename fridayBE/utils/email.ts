import { log } from "console";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const congratEmail = async (user: any) => {
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: "3d" });
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "ebifegha123@gmail.com",
      pass: "cpqxefelqhxftafc",
    },
  });

  transport
    .sendMail({
      from: `HackerRank <ebifegha123@gmail.com>`,
      to: `${user.email}`,
      subject: "Account Verified",
      html: `  <div
      style="background-color: rgb(221, 220, 220); padding: 12px; height: auto"
    >
      <h1 style="text-align: center">Your Account has been verified.</h1>
      <p>Hi, ${user.name}</p>

      <p>
       Congratulations, your email ${user.email} has been successfully verified and you can proceed to login:
      </p>
      
      <button
        style="
          border: none;
          background-color: black;
          color: white;
          font-size: 18px;
          padding: 10px;
          font-weight: bold;
        "
      >
        <a href="${process.env.URL}/verify/${token}">Verify Account</a>
       
      </button>
    </div>`,
    })
    .then(() => {
      log("Email Sent");
    });
};
export default congratEmail;
