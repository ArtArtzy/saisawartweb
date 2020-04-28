<template>
  <div class="text-body1">
    <div class="q-pa-md row" style="width:100%; max-width:800px; margin:auto">
      <div class="col">
        <table>
          <tr>
            <td style="width:80px;">Page :</td>
            <td>
              <q-radio v-model="category" val="Furniture" label="Furniture" />
            </td>
            <td>
              <q-radio v-model="category" val="HomeDecor" label="HomeDecor" />
            </td>
          </tr>
        </table>
      </div>
      <div class="col q-pt-md" align="right">
        <q-btn label="+ Add New Category" class="bg-grey-8 text-white" no-caps />
      </div>
    </div>
    <div style="width:100%; max-width:800px; margin:auto">
      <q-table :data="data" :columns="columns" row-key="name" :pagination.sync="pagination">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="orderId" :props="props" style="width:200px;">
              <div class="q-py-sm">{{ props.row.orderId }}</div>
            </q-td>
            <q-td key="orderId" :props="props">
              <div class="q-py-sm" align="left">{{ props.row.catName }}</div>
            </q-td>
            <q-td key="delete" :props="props" style="width:100px;">
              <div class="q-py-sm">
                <u>Delete</u>
              </div>
            </q-td>
            <q-td key="edit" :props="props" style="width:100px;">
              <div class="q-py-sm">
                <u>Edit</u>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: "Furniture",
      pagination: {
        rowsPerPage: 0
      },
      data: [
        {
          orderId: 100,
          catName: "Table",
          key: "asdfhklkhofsa"
        },
        {
          orderId: 200,
          catName: "Chair",
          key: "asdfhkldasdasdkhofsa"
        }
      ],
      columns: [
        {
          name: "orderId",
          label: "Order Id",
          align: "center"
        },
        {
          name: "catName",
          label: "Category Name",
          align: "left"
        },
        {
          name: "delete",
          label: "Delete",
          align: "center"
        },
        {
          name: "edit",
          label: "Edit",
          align: "center"
        }
      ]
    };
  }
};
</script>
