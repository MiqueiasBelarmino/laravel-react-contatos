import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateContact() {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    street: '',
    street_number: '',
    neighborhood: '',
    city: '',
    state: '',
    zip_code: '',
    latitude: '',
    longitude: '',
    information: '',
    owner_id:'',
    type: 'personal',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (value: any) => {
    setFormData({
      ...formData,
      type: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.post(route('contact.store'), formData);
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Create Contact
        </h2>
      }
    >
      <Head title="Create Contact" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <Card className="w-full p-6">
              <CardHeader>
                <CardTitle>New Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    placeholder="CPF"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                  <Select onValueChange={handleTypeChange} value={formData.type}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-4">
                    <Input
                      placeholder="Street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className="flex-grow"
                      required
                    />
                    <Input
                      placeholder="Street Number"
                      name="street_number"
                      value={formData.street_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Input
                    placeholder="Neighborhood"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    required
                  />
                  <div className="flex gap-4">
                    <Input
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="flex-grow"
                      required
                    />
                    <Input
                      placeholder="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Input
                    placeholder="Zip Code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    required
                  />
                  <div className="flex gap-4">
                    <Input
                      placeholder="Latitude"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      placeholder="Longitude"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Additional Information"
                    name="information"
                    value={formData.information}
                    onChange={handleChange}
                    className="mt-2"
                  />
                  <Button type="submit" variant="outline" className="w-full mt-4">
                    Save Contact
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
