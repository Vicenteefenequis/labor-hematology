'use client'

import { animalSchema, Animal } from '@/lib/zod/animal-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@labor/ui'
import { Check, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface AddAnimalModalProps {
	open: boolean
	onOpenChange?(open: boolean): void
}

export default function AddAnimalModal({
	open,
	onOpenChange,
}: AddAnimalModalProps) {
	const form = useForm<Animal>({
		resolver: zodResolver(animalSchema),
	})

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicione um novo animal</DialogTitle>

					<DialogDescription>
						Cadastre um novo animal. Rápido e simples
					</DialogDescription>
				</DialogHeader>

				<form className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Form {...form}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input {...field} />
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
									<FormLabel>Tipo de marcação</FormLabel>
									<FormControl>
										<Input {...field} />
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
										<Input {...field} />
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
									<FormLabel>Faixa etária</FormLabel>
									<FormControl>
										<Input {...field} />
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
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="speciesId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Espécie</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter className="col-span-2">
							<DialogClose asChild>
								<Button type="button" variant="destructive">
									<X />
									Cancelar
								</Button>
							</DialogClose>

							<Button>
								<Check />
								Salvar
							</Button>
						</DialogFooter>
					</Form>
				</form>
			</DialogContent>
		</Dialog>
	)
}
