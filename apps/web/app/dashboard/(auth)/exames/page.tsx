'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@labor/ui'
import { cn } from '@labor/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'

function MarkTypeSelect({ form }: { form: UseFormReturn<ExamSchema> }) {
	const [value, setValue] =
		useState<z.infer<typeof markTypeSchema>>('UNMARKED')

	const values = new Map<string, z.infer<typeof markTypeSchema>>([
		['Sem marcação', 'UNMARKED'],
		['Anilha', 'WASHER'],
		['Microchip', 'MICROCHIP'],
	])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className="justify-between"
				>
					{value
						? Object.entries(values)
								.find(([, v]) => v === value)
								?.flatMap(([k]) => [k])
						: 'Sem marcação'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<Command>
					<CommandInput placeholder="Filtrar" />
					<CommandList>
						<CommandEmpty>No results</CommandEmpty>
						<CommandGroup>
							{['Sem marcação', 'Anilha', 'Microchip'].map(
								label => (
									<CommandItem
										key={label}
										value={label}
										onSelect={currentvalue => {
											form.setValue(
												'markType',
												values.get(currentvalue)!,
											)
											setValue(values.get(currentvalue)!)
										}}
									>
										<Check
											className={cn(
												'mr-2 h-4 w-4',
												value === values.get(label)
													? 'opacity-100'
													: 'opacity-0',
											)}
										/>{' '}
										{label}
									</CommandItem>
								),
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default function Page() {
	const form = useForm<ExamSchema>({
		resolver: zodResolver(examSchema),
	})

	return (
		<div>
			<Form {...form}>
				<form className="flex flex-col gap-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
						<FormField
							control={form.control}
							name="entryTerm"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Termo de entrada</FormLabel>
									<FormControl>
										<Input
											placeholder="Exemplo de termo de entrada?"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="animalName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome do animal</FormLabel>
									<FormControl>
										<Input
											placeholder="Many o mamute"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="trackingMark"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Marcação</FormLabel>
									<FormControl>
										<Input
											placeholder="abc123def456ghi789"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="markType"
							render={() => (
								<FormItem>
									<FormLabel>Tipo</FormLabel>
									<FormControl>
										<MarkTypeSelect form={form} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="age"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Idade</FormLabel>
									<FormControl>
										<Input placeholder="45" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<FormField
							control={form.control}
							name="commonName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome comum</FormLabel>
									<FormControl>
										<Input
											placeholder="Mamute"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="specie"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Espécie</FormLabel>
									<FormControl>
										<Input
											placeholder="Mammuthus"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="classification"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Classe</FormLabel>
									<FormControl>
										<Input
											placeholder="Mamífero"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sexo</FormLabel>
									<FormControl>
										<Input
											placeholder="Masculino"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</div>
	)
}

const markTypeSchema = z.enum(['UNMARKED', 'WASHER', 'MICROCHIP'])
const examSchema = z.object({
	entryTerm: z.string(),
	animalName: z.string(),
	trackingMark: z.string(),
	markType: markTypeSchema,
	specie: z.string(),
	commonName: z.string(),
	age: z.number().positive().int(),
	gender: z.enum(['MALE', 'FEMALE']),
	classification: z.enum(['BIRD', 'REPTILE', 'MAMMAL', 'AMPHIBIAN']),
})

export type ExamSchema = z.infer<typeof examSchema>
