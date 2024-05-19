'use client'

import type { AnimalSearchResponse, AnimalResponse } from '@/lib/api/responses'
import {
	Button,
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
	CommandLoading,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@labor/ui'
import { cn } from '@labor/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface ExamAnimalSearchProps {
	placeholder?: string
	onSelect?: (animal: AnimalResponse) => void
}

export default function ExamAnimalSearch({
	placeholder,
	onSelect,
}: ExamAnimalSearchProps) {
	const [value, setValue] = useState('')
	const [search, setSearch] = useState('')

	const [animals, setAnimals] = useState<AnimalResponse[]>([])
	const [loading, setLoading] = useState(false)

	const searchTimerRef = useRef<ReturnType<typeof setTimeout>>()

	useEffect(() => {
		if (search) {
			searchTimerRef.current = setTimeout(() => {
				console.log('Calling API')
				setLoading(true)
				fetch('http://api.localhost:3000/animals?search=' + search)
					.then(async response => {
						const result =
							(await response.json()) as AnimalSearchResponse

						console.log(result.content)
						setAnimals(result.content)
					})
					.finally(() => setLoading(false))
			}, 700)
		}

		return () => {
			if (searchTimerRef.current) {
				clearTimeout(searchTimerRef.current)
			}
		}
	}, [search])

	const handleSelect = useCallback((animal: AnimalResponse) => {
		onSelect?.(animal)
		setValue(animal.name)
	}, [])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						'w-full justify-between font-normal',
						value ? 'text-black' : 'text-muted-foreground',
					)}
				>
					{value || placeholder || 'Selecione'}
					<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<Command shouldFilter={false}>
					<CommandInput
						placeholder="Pesquise algo..."
						onValueChange={setSearch}
					/>

					<CommandList>
						{loading && (
							<CommandLoading>
								<div className="flex flex-col gap-1">
									<div className="w-full animate-pulse bg-muted-foreground/20 h-5 rounded"></div>
									<div className="w-full animate-pulse bg-muted-foreground/20 h-5 rounded"></div>
									<div className="w-full animate-pulse bg-muted-foreground/20 h-5 rounded"></div>
									<div className="w-full animate-pulse bg-muted-foreground/20 h-5 rounded"></div>
									<div className="w-full animate-pulse bg-muted-foreground/20 h-5 rounded"></div>
								</div>
							</CommandLoading>
						)}

						{!loading && animals.length === 0 && (
							<CommandEmpty className="flex flex-col gap-2 py-4 w-full items-center">
								<span>Nenhum animal encontrado</span>
								<Button variant="secondary">
									Cadastre um novo animal
								</Button>
							</CommandEmpty>
						)}

						{animals.map(animal => (
							<CommandItem
								key={animal.id}
								value={animal.name}
								onSelect={() => handleSelect(animal)}
							>
								<Check
									className={cn(
										'w-5 h-5 mr-2',
										value === animal.name
											? 'opacity-100'
											: 'opacity-0',
									)}
								/>
								{animal.name}{' '}
								{animal.trackingMark && animal.trackingMark}
							</CommandItem>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
