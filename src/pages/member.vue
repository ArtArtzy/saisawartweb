<template>
  <div class="text-body1">
    <div
      class="col-12 text-h5 q-py-md"
      align="center"
      style="width:100%; max-width:800px; margin:auto"
    >Member</div>
    <div style="width:100%; max-width:800px; margin:auto">
      <q-table :data="memberList" :columns="columns" row-key="name" :pagination.sync="pagination">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="datestamp" :props="props" style="width:200px;">
              <div class="q-py-sm">{{ props.row.registDate }}</div>
            </q-td>
            <q-td key="email" :props="props">
              <div class="q-py-sm" align="left">{{ props.row.email }}</div>
            </q-td>
            <q-td key="delete" :props="props" style="width:100px;">
              <div class="q-py-sm cursor-pointer" @click="deleteMember(props.row.id)">
                <u>Delete</u>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { db } from "../router/index.js";
export default {
  data() {
    return {
      pagination: {
        rowsPerPage: 0
      },
      memberList: [],
      columns: [
        {
          name: "datestamp",
          label: "Register date",
          align: "center"
        },
        {
          name: "email",
          label: "Email",
          align: "left"
        },
        {
          name: "delete",
          label: "Delete",
          align: "center"
        }
      ],
      snaploaddata: []
    };
  },
  methods: {
    loadMember() {
      this.snaploaddata = db.collection("member").onSnapshot(doc => {
        this.memberList = [];
        doc.forEach(data => {
          let dateData = new Date(data.data().timestamp);
          let dateShow =
            dateData.getDate() +
            "/" +
            dateData.getMonth() +
            "/" +
            dateData.getFullYear();
          let temp = {
            id: data.id,
            registDate: dateShow,
            email: data.data().email,
            timestamp: data.data().timestamp
          };
          this.memberList.push(temp);
        });

        this.memberList.sort((a, b) => b.timestamp - a.timestamp);
      });
    },
    deleteMember(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete this email?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          db.collection("member")
            .doc(id)
            .delete()
            .then(() => {
              this.$q.notify({
                message: "Delete email completely",
                icon: "fas fa-check-circle",
                color: "secondary"
              });
            });
        });
    }
  },
  mounted() {
    this.loadMember();
  },
  beforeDestroy() {
    this.snaploaddata();
  }
};
</script>
