#!/usr/bin/env node
const path = require('path');
const os = require('os');
const program = require('commander');
const detect = require('detect-port');
const chalk = require('chalk');
const ora = require('ora');
const createServer = require('./createServer');
const puppeteer = require('puppeteer');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cwd = process.cwd();
const DEFAULT_PORT = 8100;

/**
 * minify an image
 *
 * @param {String} imgPath
 * @param {*} outputDir output dir
 * @returns
 */
 async function minifyImg(imgPath, outputDir) {
  return imagemin([imgPath], outputDir, {
    plugins: [imageminMozjpeg(), imageminPngquant()],
  });
}


async function exec() {
  try {
    program
      .option(
        '-l, --local [local]',
        'Set up a local server in [local] directory and take screenshot, defaults set up in `./`',
      )
      .option('-t, --timeout <timeout>', 'screenshot with a delay')
      .option('-o, --output <output>', 'Output path')
      .parse(process.argv);

    const { local, timeout, name, output } = program.opts();
    const curOutput = output || path.join(cwd, '/dist', 'screenshot.png');
    
    if (local) {
      // 端口检查，如果端口被占用了，则加1
      const port = await detect(DEFAULT_PORT);
      // 如果只是传了-l则local为true
      // 如果是传了-l http://127.0.0.1:8080，那local则为http://127.0.0.1:8080
      const serverPath = local === true ? cwd : local;
      await screenshotWithLocalServer(serverPath, curOutput, port, timeout);
    }
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
}

async function screenshot(url, output, timeout) {
  const spinner = ora('screenshoting...').start();

  try {
    const browser = await puppeteer.launch(
      /freebsd|linux/.test(os.platform) ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] } : {},
    );
    const page = await browser.newPage();
    page.setViewport({
      width: 1240,
      height: 600,
      deviceScaleFactor: 2,
    });
    await page.goto(url);
    if (timeout) {
      await sleep(timeout);
    }
    // screenshot full page
    await page.screenshot({ path: output });
    const outputDir = path.dirname(output);
    await minifyImg(output, outputDir);
    // close chromium
    await browser.close();
    spinner.succeed(chalk.green('Screenshot success!'));
    console.log(chalk.green(`Screenshot output path: ${output}`));
  } catch(err) {
    spinner.fail(chalk.red('Screenshot fail!'));

    // chromium not download error
    // stdout reinstall puppeteer tips.
    if (err.message === 'Chromium revision is not downloaded. Run "npm install" or "yarn install"') {
      console.log(chalk.red('\n\nPuppeteer Install fail. \nPlease install puppeteer using the following commands:'));
      console.log(chalk.white('\n  npm uninstall puppeteer -g'));
      console.log(
        chalk.white(
          '\n  PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm i puppeteer -g --registry=https://registry.npmmirror.com',
        ),
      );
      console.log(chalk.white('\n  screenshot -u http://www.example.com\n'));
    } else {
      console.error(err);
    }
    process.exit(1);
  }
}

async function screenshotWithLocalServer(serverPath, output, port, timeout) {
  const targetUrl = `http://127.0.0.1:${port}/index.html`;
  const server = createServer(path.resolve(serverPath, './dist'), port);
  console.log(chalk.white(`Create local server with port ${port}`));
  console.log(chalk.white(`The screenshot target url: ${targetUrl}`));
  await screenshot(targetUrl, output, timeout);

  server.close();
}

exec();