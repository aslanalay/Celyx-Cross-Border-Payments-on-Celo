#!/usr/bin/env node

import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import chalk from 'chalk';

const program = new Command();

program
  .name('celyx-cli')
  .description('CLI tool for creating and managing Celyx remittance dApps on the Celo blockchain')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new Celyx remittance project')
  .argument('[project-name]', 'Name of the Celyx project')
  .option('-d, --description <description>', 'Project description')
  .option('-t, --template <type>', 'Template type (remittance-basic, remittance-plus, mobile-wallet)')
  .option('--wallet-provider <provider>', 'Wallet provider (valora, celo-wallet, rainbowkit, none)')
  .option('-c, --contracts <framework>', 'Smart contract framework (hardhat, foundry, none)')
  .option('--stablecoin <token>', 'Preferred stablecoin (cUSD, cEUR, USDT)')
  .option('--skip-install', 'Skip package installation')
  .option('-y, --yes', 'Use default configuration without prompts')
  .action(createCommand);

program
  .command('deploy')
  .description('Deploy your Celyx smart contracts to the Celo testnet or mainnet')
  .option('-n, --network <network>', 'Network to deploy (alfajores, mainnet)', 'alfajores')
  .action(() => {
    console.log(chalk.cyan('🚀 Deploying Celyx contracts to the Celo network...'));
    // Future: integrate deployment script here
  });

program
  .command('status')
  .description('Check the deployment or wallet status of your Celyx project')
  .action(() => {
    console.log(chalk.green('📊 Checking Celyx project status...'));
    // Future: implement project status checks here
  });

// Invalid command handler
program.on('command:*', () => {
  console.error(chalk.red(`❌ Invalid command: ${program.args.join(' ')}`));
  console.log(chalk.yellow('💡 See --help for a list of available commands.'));
  process.exit(1);
});

// Default help screen
if (process.argv.length === 2) {
  console.log(chalk.cyanBright('\n🌍 Welcome to Celyx CLI'));
  console.log(chalk.green('Build decentralized remittance applications on Celo with ease.\n'));
  program.help();
}

program.parse(process.argv);
