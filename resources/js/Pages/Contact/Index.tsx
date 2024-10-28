import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import ContactList from '@/Components/Contact/ContactList';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthProps {
    auth?: {
        user: User;
    };
    contacts: any;
}

export default function Index({ auth, contacts }: AuthProps) {
    const totalPages = contacts.meta.last_page;
    const currentPage = contacts.meta.current_page;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Contacts
                </h2>
            }
        >
            <Head title="Contacts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Here it is
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Contacts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Select>
                                                <SelectTrigger className="w-full sm:w-[180px]">
                                                    <SelectValue placeholder="Tipo de contato" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All</SelectItem>
                                                    <SelectItem value="personal">Personal</SelectItem>
                                                    <SelectItem value="business">Business</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="flex-grow flex gap-2">
                                                <Input placeholder="Buscar" className="flex-grow" />
                                                <Button variant="outline">
                                                    <Search className="h-4 w-4" />
                                                    <span className="sr-only">Search</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <ContactList contacts={contacts.data} />

                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={contacts.links.prev || '#'}
                                                className={`flex ${!contacts.links.prev ? 'pointer-events-none text-gray-400' : ''}`}
                                            >
                                                <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                                            </Link>
                                            <span className="text-sm text-muted-foreground">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <Link
                                                href={contacts.links.next || '#'}
                                                className={`flex ${!contacts.links.next ? 'pointer-events-none text-gray-400' : ''}`}
                                            >
                                                Next <ChevronRight className="h-4 w-4 ml-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground">Google Map Placeholder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
