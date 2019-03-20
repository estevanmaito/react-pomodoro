import React from "react";
import cls from "./Footer.module.css";
import { ReactComponent as GithubIcon } from "../../assets/img/github.svg";

const Footer = props => {
  return (
    <div className={cls.footer}>
      <p>
        Made by{" "}
        <a
          href="https://github.com/estevanmaito"
          target="_blank"
          rel="noopener noreferrer"
        >
          @estevanmaito
        </a>
      </p>
      <a
        href="https://github.com/estevanmaito/react-pomodoro"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
    </div>
  );
};

export default React.memo(Footer);
