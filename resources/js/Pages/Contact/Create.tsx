import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import validateCPF from '@/helpers/validate-cpf';

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
    information: '',
    owner_id: '',
    type: 'personal',
  });

  const [isCpfValid, setIsCpfValid] = useState(true);

  const handleChange = (e: any) => {
    const value: string = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });

    if(e.target.name == "cpf"){
      if(value.trim().length >0){
        setIsCpfValid(validateCPF(e.target.value));
      } else {
        setIsCpfValid(true);
      }
    }
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


  const fetchAddress = async () => {
    try {
      const response = await axios.get(`/api/address`, {
        params: { zip_code: formData.zip_code }
      });
      const address = response.data ?? {};
      if (address?.uf) {
        setFormData({
          ...formData,
          state: address.uf,
        });
      }
      if (address?.localidade) {
        setFormData({
          ...formData,
          city: address.localidade,
        });
      }
      if (address?.logradouro) {
        setFormData({
          ...formData,
          street: address.logradouro,
        });
      }
      if (address?.bairro) {
        setFormData({
          ...formData,
          neighborhood: address.bairro,
        });
      }
    } catch (error) {
    }
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
                    placeholder="CPF (only numbers)"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    className={`${isCpfValid? '':'bg-red-300'}`}
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
                  <div className='flex items-center justify-center'>
                    <Input
                      placeholder="Zip Code"
                      name="zip_code"
                      value={formData.zip_code}
                      onChange={handleChange}
                      required
                    />
                    <Button variant="secondary" type="button" onClick={() => fetchAddress()}>
                      <Search className="h-4 w-4" />
                      <span className="sr-only">search</span>
                    </Button>
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
