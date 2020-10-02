import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'new_service_controller.dart';

class NewServicePage extends StatefulWidget {
  final String title;
  const NewServicePage({Key key, this.title = "Novo Servico"}) : super(key: key);

  @override
  _NewServicePageState createState() => _NewServicePageState();
}

class _NewServicePageState
    extends ModularState<NewServicePage, NewServiceController> {
  //use 'controller' variable to access controller

  int selected = 0;
  TextEditingController textEditingController = new TextEditingController();

  @override
  void initState() {
    super.initState();
    List<DropdownMenuItem> data = new List<DropdownMenuItem>();
    data.add(DropdownMenuItem(child: Text("BANHO"), value: 0));
    data.add(DropdownMenuItem(child: Text("TOSA"), value: 1));
    data.add(DropdownMenuItem(child: Text("BANHO E TOSA"), value: 2));
    controller.createServiceTypeList(data);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Padding( 
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          Row(children: [
            Text('Escolha o tipo'),
            SizedBox(width: 20),
            DropdownButton(
              value: selected,
              items: controller.serviceTypeList,
              onChanged: (value) {
                setState(() {
                  selected = value;
                });
              }
            ),
          ]),
          TextField(
            controller: textEditingController,
            keyboardType: TextInputType.number,
            decoration: InputDecoration(
              hintText: "Valor"
            ),
          )
        ],
      ),
    ),
    floatingActionButton: FloatingActionButton(
        onPressed: () {
          print('Valor: ' + textEditingController.text);
          Modular.to.pop();
        },
        child: Icon(Icons.save, color: Theme.of(context).floatingActionButtonTheme.foregroundColor,),
        foregroundColor: Theme.of(context).floatingActionButtonTheme.foregroundColor,
      ),
    );
  }
}
