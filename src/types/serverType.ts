export type ServerType = {
    id: number;
    name: string;
    ip: string;
    status: 'active' | 'inactive';
    created_at: string;
    company_name: string;
};