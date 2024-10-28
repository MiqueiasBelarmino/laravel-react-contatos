import { Button } from "@/Components/ui/button";
import { Contact } from "@/types";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContactsListProps {
    contacts: Contact[];
}

export default function ContactList({ contacts }: ContactsListProps) {
    return (
        <>
            <div className="border rounded-md h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {contacts.map((contact) => (
                    <div key={contact.id} className="p-4 border-b last:border-b-0 hover:bg-muted/50">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.type}</p>
                    </div>
                ))}
            </div>
            {/* <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
                <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
                    Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </div> */}
        </>
    );
}