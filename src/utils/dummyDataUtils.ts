export const FIELD_OPTIONS = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'address', label: 'Address' },
    { key: 'company', label: 'Company' },
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'bio', label: 'Bio' },
] as const;

export type FieldKey = (typeof FIELD_OPTIONS)[number]['key'];
export type ExportFormat = 'JSON' | 'CSV' | 'SQL';

const FIRST_NAMES = ['Aarav', 'Vivaan', 'Aditya', 'Sarthak', 'Arjun', 'Rohan', 'Priya', 'Ananya', 'Ishaan', 'Kavya', 'Neha', 'Rahul', 'Sneha', 'Vikram', 'Pooja', 'Amit', 'Divya', 'Karan', 'Meera', 'Raj'];
const LAST_NAMES = ['Sharma', 'Verma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Joshi', 'Mehta', 'Nair', 'Iyer', 'Reddy', 'Rao', 'Chopra', 'Malhotra', 'Bose', 'Das', 'Shah', 'Pillai', 'Chauhan', 'Mishra'];
const DOMAINS = ['gmail.com', 'outlook.com', 'yahoo.in', 'proton.me', 'rediffmail.com', 'company.in'];
const STREETS = ['MG Road', 'Brigade Road', 'Linking Road', 'Park Street', 'Anna Salai', 'FC Road', 'Connaught Place', 'Banjara Hills'];
const CITIES = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];
const COMPANIES = ['Infosys', 'TCS', 'Wipro', 'HCL Technologies', 'Tech Mahindra', 'Razorpay', 'Zerodha', 'CRED'];
const JOB_TITLES = ['Software Engineer', 'Product Manager', 'Designer', 'Data Analyst', 'DevOps Engineer', 'QA Lead', 'CTO', 'Intern', 'Tech Lead', 'Architect'];
const BIOS = [
    'Passionate about building scalable backend systems.',
    'Chai enthusiast and open-source contributor.',
    'Loves cricket, coding, and biryani.',
    'Full-stack developer with 5+ years of experience.',
    'Always learning something new.',
    'Believer in clean code and good documentation.',
];

function pick<T>(arr: T[]): T {
    if (arr.length === 0) throw new Error('Cannot pick from an empty array');
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRecord(fields: Set<FieldKey>): Record<string, string> {
    const record: Record<string, string> = {};
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    if (fields.has('name')) record.name = `${first} ${last}`;
    if (fields.has('email')) record.email = `${first.toLowerCase()}.${last.toLowerCase()}@${pick(DOMAINS)}`;
    if (fields.has('phone')) record.phone = `+91-${Math.floor(6000000000 + Math.random() * 3999999999)}`;
    if (fields.has('address')) record.address = `${Math.floor(1 + Math.random() * 999)}, ${pick(STREETS)}, ${pick(CITIES)}`;
    if (fields.has('company')) record.company = pick(COMPANIES);
    if (fields.has('jobTitle')) record.jobTitle = pick(JOB_TITLES);
    if (fields.has('bio')) record.bio = pick(BIOS);
    return record;
}

export function generateRecords(count: number, fields: Set<FieldKey>): Record<string, string>[] {
    const clamped = Math.min(Math.max(count, 0), 1000);
    return Array.from({ length: clamped }, () => generateRecord(fields));
}

export function toCSV(data: Record<string, string>[]): string {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(h => `"${(row[h] || '').replace(/"/g, '""')}"`).join(','));
    return [headers.join(','), ...rows].join('\n');
}

const SAFE_IDENTIFIER = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function validateIdentifier(name: string, label: string): void {
    if (!SAFE_IDENTIFIER.test(name)) {
        throw new Error(`Invalid ${label}: "${name}"`);
    }
}

export function toSQL(data: Record<string, string>[], table = 'users'): string {
    if (data.length === 0) return '';
    validateIdentifier(table, 'table name');
    const headers = Object.keys(data[0]);
    headers.forEach(h => validateIdentifier(h, 'column name'));
    return data
        .map(row => {
            const values = headers.map(h => `'${(row[h] || '').replace(/'/g, "''")}'`).join(', ');
            return `INSERT INTO ${table} (${headers.join(', ')}) VALUES (${values});`;
        })
        .join('\n');
}

export function formatOutput(data: Record<string, string>[], format: ExportFormat): string {
    switch (format) {
        case 'JSON':
            return JSON.stringify(data, null, 2);
        case 'CSV':
            return toCSV(data);
        case 'SQL':
            return toSQL(data);
    }
}