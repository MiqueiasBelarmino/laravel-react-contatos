import { Contact } from "@/types";
import { Link, router } from "@inertiajs/react";
import { Edit, Trash } from 'lucide-react';

interface ContactsListProps {
    contacts: Contact[];
    onContactClick: (contact: Contact) => void;
}

export default function ContactList({ contacts, onContactClick }: ContactsListProps) {

    const handleDelete = (id: number) => {
        if (!window.confirm("Are you sure you want to delete the contact?")) {
            return;
        }
        router.delete(route("contact.destroy", id));
    };

    return (
        <>
            <div className="border rounded-md h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {contacts.map((contact) => (
                    <div key={contact.id} onClick={() => onContactClick(contact)} className="p-4 border-b last:border-b-0 hover:bg-muted/50 flex cursor-pointer">
                        <div>
                            <h3 className="font-semibold">{contact.name}</h3>
                            <p className="text-sm text-muted-foreground">{contact.type}</p>
                        </div>
                        <div className='flex ml-auto'>
                            <Link href={route("contact.edit", contact.id)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Link>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(contact.id);
                            }} className="ml-2">
                                <Trash className="h-4 w-4 text-red-600" />
                                <span className="sr-only">Delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}