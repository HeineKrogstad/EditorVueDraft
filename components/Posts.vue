<template>
    <div class="card">
        <Tabs value="0">
            <TabList>
                <Tab value="0">Личный</Tab>
                <Tab value="1">Командный</Tab>
                <Tab value="2">Публичный</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <p class="m-0">
                        Личный
                    </p>
                </TabPanel>
                <TabPanel value="1">
                    <p class="m-0">
                        Командный
                    </p>
                </TabPanel>
                <TabPanel value="2">
                    <p class="m-0">
                        Публичный
                    </p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script>
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

</script>

<style>
</style>
