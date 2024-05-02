'use client'

import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@labor/ui'
import { cn } from '@labor/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

export interface AutocompleteProps {
	options: Array<{ label: string; value: string }>
	placeholder?: string
}

export default function Autocomplete({
	options = [],
	placeholder,
}: AutocompleteProps) {
	const [selected, setValue] = useState('')

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						'w-full justify-between font-normal',
						selected ? 'text-black' : 'text-muted-foreground',
					)}
				>
					{selected || placeholder || 'Selecione'}
					<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<Command>
					<CommandInput placeholder="Pesquise algo..." />
					<CommandEmpty>
						<Button variant="secondary">Adicionar</Button>
					</CommandEmpty>

					<CommandList>
						<CommandGroup>
							{options.map(({ label, value }) => (
								<CommandItem
									value={value}
									onSelect={() => setValue(value)}
								>
									<Check
										className={cn(
											'w-5 h-5 mr-2',
											value === selected
												? 'opacity-100'
												: 'opacity-0',
										)}
									/>
									{label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
