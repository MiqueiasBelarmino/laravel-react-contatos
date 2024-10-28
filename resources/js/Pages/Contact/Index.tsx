import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ContactList from '@/Components/Contact/ContactList';
import { Contact } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthProps {
    auth?: {
        user: User;
    };
    contacts: any
}
export default function Index({ auth, contacts }: AuthProps) {

    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 5;
    const totalPages = Math.ceil(contacts.data.length / contactsPerPage);

    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.data.slice(indexOfFirstContact, indexOfLastContact);

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

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
                                        <ContactList
                                            contacts={currentContacts} 
                                            currentPage={currentPage} 
                                            totalPages={totalPages} 
                                            nextPage={nextPage} 
                                            prevPage={prevPage} 
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground">Google Map Placeholder</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div >

        </AuthenticatedLayout >
    );
}