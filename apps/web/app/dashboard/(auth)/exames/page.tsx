'use client'

import { useState } from 'react'
import { AnimalResponse, SpeciesResponse } from '@/lib/api/responses'
import AnimalSearch from '@/ui/exam-animal-search'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@labor/ui'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddAnimalModal from '@/ui/add-animal-modal'
import { API_DOMAIN } from '@labor/utils'

const markTypes: Record<string, MarkType> = {
	'Sem marcação': 'UNMARKED',
	Anilha: 'WASHER',
	Microchip: 'MICROCHIP',
}

const ageOptions: Record<string, AgeOptions> = {
	Filhote: 'CUB',
	Jovem: 'YOUNG',
	Adulto: 'ADULT',
	Idoso: 'ELDERLY',
}

const genderOptions: Record<string, Gender> = {
	Macho: 'MALE',
	Fêmea: 'FEMALE',
	Indefinido: 'UNDEFINED',
}

export default function Page() {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	const form = useForm<ExamSchema>({
		resolver: zodResolver(examSchema),
		defaultValues: {
			markType: 'UNMARKED',
			age: 'ADULT',
			gender: 'UNDEFINED',
		},
	})

	const handleSelectAnimal = (animal: AnimalResponse) => {
		setLoading(true)
		form.setValue('animalName', animal.name)
		if (animal.trackingMark) {
			form.setValue('trackingMark', animal.trackingMark)
		} else {
			form.setValue('trackingMark', '')
		}

		if (animal.markType) {
			form.setValue('markType', animal.markType)
		} else {
			form.setValue('markType', 'UNMARKED')
		}

		form.setValue('age', animal.age)
		form.setValue('gender', animal.gender)

		fetch(`${API_DOMAIN}/species/${animal.speciesId}`)
			.then(async response => {
				const result = (await response.json()) as SpeciesResponse

				form.setValue('specie', result.scientificName)
				form.setValue('commonName', result.commonName!)
				form.setValue('classification', result.classification)
			})
			.finally(() => setLoading(false))
	}

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
										<AnimalSearch
											placeholder="Many o mamute"
											onSelect={handleSelectAnimal}
											openNewAnimalModal={() =>
												setOpen(true)
											}
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
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo</FormLabel>
									<Select
										onValueChange={value =>
											form.setValue(
												'markType',
												value as any,
											)
										}
										value={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Sem marcação" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{Object.entries(markTypes).map(
												([label, value]) => (
													<SelectItem
														key={value}
														value={value}
													>
														{label}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>
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
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="Adulto" />
											</SelectTrigger>

											<SelectContent>
												<SelectGroup>
													{Object.entries(
														ageOptions,
													).map(item => (
														<SelectItem
															key={item[1]}
															value={item[1]}
														>
															{item[0]}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
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
											disabled={loading || field.disabled}
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
											disabled={loading || field.disabled}
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
											disabled={loading || field.disabled}
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
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="Indefinido" />
											</SelectTrigger>

											<SelectContent>
												<SelectGroup>
													{Object.entries(
														genderOptions,
													).map(item => (
														<SelectItem
															key={item[1]}
															value={item[1]}
														>
															{item[0]}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>

			<AddAnimalModal open={open} onOpenChange={setOpen} />
		</div>
	)
}

const markTypeSchema = z.enum(['UNMARKED', 'WASHER', 'MICROCHIP'])
export type MarkType = z.infer<typeof markTypeSchema>

const agesSchema = z.enum(['CUB', 'YOUNG', 'ADULT', 'ELDERLY'])
export type AgeOptions = z.infer<typeof agesSchema>

const genderSchema = z.enum(['MALE', 'FEMALE', 'UNDEFINED'])
export type Gender = z.infer<typeof genderSchema>

const examSchema = z.object({
	entryTerm: z.string(),
	animalName: z.string(),
	trackingMark: z.string(),
	markType: markTypeSchema,
	specie: z.string(),
	commonName: z.string(),
	age: agesSchema,
	gender: z.enum(['MALE', 'FEMALE', 'UNDEFINED']),
	classification: z.enum(['BIRD', 'REPTILE', 'MAMMAL', 'AMPHIBIAN']),
})

export type ExamSchema = z.infer<typeof examSchema>
