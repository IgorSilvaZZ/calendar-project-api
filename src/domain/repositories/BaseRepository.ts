export interface BaseRepository<
	T,
	CreateInput,
	UpdateInput = Partial<CreateInput>,
> {
	findById(id: string): Promise<T | null>;
	findAll(): Promise<T[]>;
	create(input: CreateInput): Promise<T>;
	update(id: string, input: UpdateInput): Promise<T>;
}
