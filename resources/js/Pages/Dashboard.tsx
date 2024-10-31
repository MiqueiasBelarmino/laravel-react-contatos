import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>

            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Pending items (Even if the item is almost completed it will be shown as pending)

                            <ol className="mt-6 list-disc list-inside">
                                <li style={{ listStyleType: 'none' }}>---------- Features ----------</li>
                                <li>Sign up</li>
                                <li>Recovery password</li>
                                <li>Do login/logout</li>
                                <li>Manage contact list</li>
                                <li>Address search</li>
                                <li style={{ textDecoration: 'line-through' }}>ViaCep integration</li>
                                <li>Address suggestion system (display options and auto-type)</li>
                                <li>Contact filters (name and cpf)</li>
                                <li style={{ textDecoration: 'line-through' }}>Pin and center map to selected contact</li>
                                <li>Edit/Remove contact</li>
                                <li style={{ textDecoration: 'line-through' }}>Remove own account</li>
                                <li style={{ listStyleType: 'none' }}>---------- Validations ----------</li>
                                <li style={{ textDecoration: 'line-through' }}>CPF must be validated</li> 
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
