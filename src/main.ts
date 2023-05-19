#!/usr/bin/env node

import Chalk from "chalk";
import ChalkAnimation from "chalk-animation";
import fs from "fs";
import Inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import { cwd } from "node:process";
import path from "path";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
  const rainbowTitle = ChalkAnimation.rainbow("Make your own React components!")
  await sleep()
  rainbowTitle.stop()

  console.log(`
    ${Chalk.cyanBright("Basic usage:")}
    1- Create component with styled components = crc -s styled
    2- Create component with Tailwindcss = crc -s tailwind
  `);
}

async function chooseOption() {
  const answer = await Inquirer.prompt({
    name: "component_name",
    type: "input",
    message: "Which the component name?",
  })

  handleCreateComponent(answer.component_name);
}

function createComponent(componentName: string) {
  const absolutePath = path.join(cwd(), "src", "components", componentName)
  console.log(absolutePath);
  

  fs.mkdirSync(absolutePath, {recursive: true});

  const fileContent = `function sayHello() {
  return 'Hello World';
}

console.log(sayHello());`;

  const absoluteFilePath = path.join(absolutePath, componentName);
  fs.writeFileSync(absoluteFilePath, fileContent)
}

async function handleCreateComponent(componentName: string) {
  const spinner = createSpinner("Creating...").start();
  await sleep();

  if (!!componentName) {
    createComponent(`${componentName}`)
    spinner.success({
      text: `Nice, component ${componentName} has been created`,
    });
  } else {
    spinner.error({ text: "An error occurred" });
    process.exit(1);
  }
}

welcome();
chooseOption();
