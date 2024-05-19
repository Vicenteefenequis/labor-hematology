import { Command } from 'commander'
import { $ } from 'execa'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

const createMigrations = new Command()
	.name('create')
	.argument('<name>', 'name of migration')
	.action(async name => {
		const { stdout: std1 } =
			await $`pnpm dlx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma --script > down.sql`
		console.log(std1)
		const { stdout: std2 } =
			await $`pnpm dlx prisma migrate dev --name ${name}`
		console.log(std2)
	})

function main() {
	const program = new Command().name('migrations')

	program.addCommand(createMigrations)
	// .addCommand(deployMigrations)
	// .addCommand(rollbackMigrations)
	//
	program.parse()
}

main()
