import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { Head, Link, router } from '@inertiajs/react';
import ContactList from '@/Components/Contact/ContactList';
import { Contact } from '@/types';
import Map from '@/Components/Contact/Map';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface ContactProps {
    auth?: {
        user: User;
    };
    contacts: any;
    filteringParams: any;
}

export default function Index({ auth, contacts, filteringParams = null }: ContactProps) {
    const totalPages = contacts.meta.last_page;
    const currentPage = contacts.meta.current_page;
    const [contactType, setContactType] = useState('all');
    const [filterValue, setFilterValue] = useState('');

    filteringParams = filteringParams || {};
    const handleFilter = () => {
        if (filterValue) {
            filteringParams['filter'] = filterValue;
        } else {
            delete filteringParams['filter'];
        }
        if (contactType) {
            filteringParams['type_to_filter'] = contactType;
        } else {
            delete filteringParams['type_to_filter'];
        }
        router.get(route("contact.index"), filteringParams);
    }

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
                        <div className="p-6 text-gray-900 flex items-center justify-center">
                            Here you can filter all your contacts.
                            <Link
                                href={route("contact.create")}
                                className="ml-auto bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                            >
                                Add new
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Contacts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Select onValueChange={setContactType}>
                                                <SelectTrigger className="w-full sm:w-[180px]">
                                                    <SelectValue placeholder="Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All</SelectItem>
                                                    <SelectItem value="personal">Personal</SelectItem>
                                                    <SelectItem value="business">Business</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="flex-grow flex gap-2">
                                                <Input placeholder="Name or CPF" type='text' defaultValue={filteringParams.filter} className="flex-grow" onChange={e => setFilterValue(e.target.value)} />
                                                <Button variant="outline" onClick={handleFilter}>
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
                                <Map positions={contacts.data.map((contact: Contact) => {
                                    return { lat: parseFloat(contact.latitude), lng: parseFloat(contact.longitude) }
                                })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
