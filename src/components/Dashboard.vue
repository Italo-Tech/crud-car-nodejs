<script setup>
import {
  Dialog,
  DialogPanel, DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon, CheckIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/vue/20/solid'

import {ref, onBeforeMount} from 'vue'
import axios from "axios";

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Times', href: '#', icon: UsersIcon, current: false },
  { name: 'Projetos', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendário', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documentos', href: '#', icon: DocumentDuplicateIcon, current: false },
]
const userNavigation = [
  { name: 'Meu perfil', href: '#' },
  { name: 'Sair', href: '#' },
]

const sidebarOpen = ref(false)
const modalAddCar = ref(false)
const modalEditCar = ref(false)

const payloadAddCar = ref({
  modelo: '',
  placa: '',
  cor: '',
  ano: ''
})
const payloadEditCar = ref({
  modelo: '',
  placa: '',
  cor: '',
  ano: ''
})

onBeforeMount(() => {
  fetchData();
});

const data = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/cars');
    data.value = response.data.result;
  } catch (error) {
    console.error('Erro na requisição:', error.message);
  }
};
// Function add car
const addCar = async (payload) => {
  try {
    const response = await axios.post('http://localhost:3000/api/car', {
      modelo: payload.modelo,
      placa: payload.placa,
      cor: payload.cor,
      ano: payload.ano
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      setTimeout(() => {
        modalAddCar.value = false
        payloadAddCar.value = {
          modelo: '',
          placa: '',
          cor: '',
          ano: ''
        }
      }, 500)
    });

    console.log('Criou com sucesso', response.data);

  } catch (error) {
    console.error('Erro', error.message);
  }
};
// Function edit car
const editCar = async () => {
  try {
    const response = await axios.put(`http://localhost:3000/api/car/${payloadEditCar.value.codigo}`, {
      modelo: payloadEditCar.value.modelo,
      placa: payloadEditCar.value.placa,
      cor: payloadEditCar.value.cor,
      ano: payloadEditCar.value.ano
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      fetchData();
      setTimeout(() => {
        modalEditCar.value = false
      }, 500)
    });

    console.log('Criou com sucesso', response.data);

  } catch (error) {
    console.error('Erro', error.message);
  }
};
// Function delete car
const deleteCar = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/car/${payloadEditCar.value.codigo}`).then((response) => {
      fetchData();
      setTimeout(() => {
        modalEditCar.value = false
      }, 500)
    });

    console.log('Criou com sucesso', response.data);

  } catch (error) {
    console.error('Erro', error.message);
  }
};


// Modal edit car
const modalCar = async (payload) => {
  console.log(payload);
  payloadEditCar.value = payload;
  modalEditCar.value = true;
};
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div class="flex h-16 shrink-0 items-center">
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a :href="item.href" :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                            <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <a :href="item.href" :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Abrir sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="relative flex flex-1" action="#" method="GET">
            <label for="search-field" class="sr-only">Procurar</label>
            <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" aria-hidden="true" />
            <input id="search-field" class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Procurar..." type="search" name="search" />
          </form>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Ver notificações</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Separator -->
            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Abrir menu usuário</span>
                <img class="h-8 w-8 rounded-full bg-gray-50" src="https://avatars.githubusercontent.com/u/55564143?s=400&u=f5bf42390125a0de16d744ab49b6d1b8e2867af9&v=4" alt="" />
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">Ítalo Quelé</span>
                  <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a :href="item.href" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">{{ item.name }}</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <!-- Your content -->

          <div class="flex justify-between items-center">
            <div class="flex flex-col">
              <span class="text-3xl text-gray-800">Carros</span>
              <span class="text-gray-400">{{ data ? data.length : '0' }} registros encontrados</span>
            </div>
            <div>
              <button @click="modalAddCar = true" type="button" class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Adicionar carro
              </button>
            </div>
          </div>

          <div class="bg-white">
            <div class="max-w-2xl py-16 lg:max-w-full">

              <h2 class="sr-only">Carros</h2>

              <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                <div v-for="car in data" :key="car.codigo" @click="modalCar(car)" class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <div class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-52">
                    <img src="/src/assets/no-image.jpg" alt="" class="h-full w-full object-cover object-center sm:h-full sm:w-full" />
                  </div>
                  <div class="flex flex-1 flex-col space-y-2 p-4">
                    <h3 class="text-sm font-medium text-gray-900">
                        <span aria-hidden="true" class="absolute inset-0" />
                        {{ car.modelo }}
                    </h3>
                    <p class="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <div class="flex flex-1 flex-col justify-end">
                      <p class="text-sm italic text-gray-500">{{ car.placa }}</p>
                      <p class="text-base font-medium text-gray-900">{{ car.cor }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>

    <!-- Modals -->
    <!--Modal Add Car-->
    <TransitionRoot as="template" :show="modalAddCar">
      <Dialog as="div" class="relative z-10" @close="modalAddCar = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <form>
                  <div class="space-y-12">
                    <div class="border-b border-gray-900/10 pb-12">
                      <h2 class="text-base font-semibold leading-7 text-gray-900">Criar novo registro</h2>
                      <p class="mt-1 text-sm leading-6 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <!--Modelo-->
                        <div class="sm:col-span-3">
                          <label class="block text-sm font-medium leading-6 text-gray-900">Modelo</label>
                          <div class="mt-2">
                            <input v-model="payloadAddCar.modelo" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <!--Placa-->
                        <div class="sm:col-span-3">
                          <label class="block text-sm font-medium leading-6 text-gray-900">Placa</label>
                          <div class="mt-2">
                            <input v-model="payloadAddCar.placa" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <!--Cor-->
                        <div class="sm:col-span-3">
                          <label class="block text-sm font-medium leading-6 text-gray-900">Cor</label>
                          <div class="mt-2">
                            <input v-model="payloadAddCar.cor" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <!--Ano-->
                        <div class="sm:col-span-3">
                          <label class="block text-sm font-medium leading-6 text-gray-900">Ano de Fabricação</label>
                          <div class="mt-2">
                            <input v-model="payloadAddCar.ano" type="number" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
                    <button @click="addCar(payloadAddCar)" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Adicionar</button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!--Modal Edit Car-->
    <TransitionRoot as="template" :show="modalEditCar">
      <Dialog as="div" class="relative z-10" @close="modalEditCar = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <form>
                  <div class="space-y-12">
                    <div class="border-b border-gray-900/10 pb-12">
                      <h2 class="text-base font-semibold leading-7 text-gray-900">Editar registro</h2>
                      <p class="mt-1 text-sm leading-6 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <!--Modelo-->
                        <div class="sm:col-span-3">
                          <label class="block text-sm font-medium leading-6 text-gray-900">Modelo</label>
                          <div class="mt-2">
                            <input v-model="payloadEditCar.modelo" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <!--Placa-->
                        <div class="sm:col-span-3">
                          <label class="block text-sm font-medium leading-6 text-gray-900">Placa</label>
                          <div class="mt-2">
                            <input v-model="payloadEditCar.placa" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <!--Cor-->
                        <div class="sm:col-span-3">
                          <label class="block text-sm font-medium leading-6 text-gray-900">Cor</label>
                          <div class="mt-2">
                            <input v-model="payloadEditCar.cor" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <!--Ano-->
                        <div class="sm:col-span-3">
                          <label class="block text-sm font-medium leading-6 text-gray-900">Ano de Fabricação</label>
                          <div class="mt-2">
                            <input v-model="payloadEditCar.ano" type="number" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex items-center justify-between">
                    <button @click="deleteCar(payloadEditCar.codigo)" class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Remover</button>
                    <div class="flex gap-x-6">
                      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
                      <button @click="editCar(payloadEditCar)" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Salvar edição</button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style scoped>

</style>
