import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'new_schedule_controller.dart';

class NewSchedulePage extends StatefulWidget {
  final String title;
  final dynamic selectedDay;
  const NewSchedulePage({Key key, this.selectedDay, this.title = "Novo Agendamento"})
      : super(key: key);

  @override
  _NewSchedulePageState createState() => _NewSchedulePageState();
}

class _NewSchedulePageState
    extends ModularState<NewSchedulePage, NewScheduleController> {
  //use 'controller' variable to access controller
  int _value = 1;
  TextEditingController _obsInputController = TextEditingController(); 

  @override
  Widget build(BuildContext context) {
    print(widget.selectedDay);
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
                Center( child: Padding(
                  padding: EdgeInsets.all(30), 
                  child: Text(
                  'Data: '+ widget.selectedDay.day.toString() +'/'+ widget.selectedDay.month.toString() +'/'+ widget.selectedDay.year.toString(),
                  style: TextStyle(color: Colors.grey, fontSize: 22)
                ))),
                Padding(
                  padding: EdgeInsets.all(10), 
                  child: Text('Escolha o servico')
                ),
                Padding(
                  padding: EdgeInsets.all(10), 
                  child: DropdownButton(
                    value: _value,
                    items: [
                      DropdownMenuItem(
                        child: Text('BANHO'),
                        value: 1,
                      ),
                      DropdownMenuItem(
                        child: Text("TOSA COMPLETA"),
                        value: 2,
                      ),
                      DropdownMenuItem(
                        child: Text("TOSA HIGIENICA"),
                        value: 3
                      ),
                      DropdownMenuItem(
                          child: Text("BANHO E TOSA"),
                          value: 4
                      )
                    ],
                    onChanged: (value) {
                      setState(() {
                        _value = value;
                      });
                    }
                  ) 
                ),
                Padding(
                  padding: EdgeInsets.all(10), 
                  child: Text('Escolha o horário')
                ),
                Padding(
                  padding: EdgeInsets.all(10), 
                  child: DropdownButton(
                    value: _value,
                    items: [
                      DropdownMenuItem(
                        child: Text('10:00'),
                        value: 1,
                      ),
                      DropdownMenuItem(
                        child: Text("11:00"),
                        value: 2,
                      ),
                      DropdownMenuItem(
                        child: Text("13:00"),
                        value: 3
                      ),
                      DropdownMenuItem(
                          child: Text("14:00"),
                          value: 4
                      ),
                      DropdownMenuItem(
                          child: Text("15:00"),
                          value: 5
                      )
                    ],
                    onChanged: (value) {
                      setState(() {
                        _value = value;
                      });
                    }
                  ) 
                ),
                Padding(
                  padding: EdgeInsets.all(10), 
                  child: Text('Escolha o pet')
                ),
                Padding(
                  padding: EdgeInsets.all(10), 
                  child: DropdownButton(
                    value: _value,
                    items: [
                      DropdownMenuItem(
                        child: Text('Maya'),
                        value: 1,
                      ),
                      DropdownMenuItem(
                        child: Text("Totó"),
                        value: 2,
                      ),
                      DropdownMenuItem(
                        child: Text("Spike"),
                        value: 3
                      ),
                      DropdownMenuItem(
                          child: Text("Vicky"),
                          value: 4
                      ),
                      DropdownMenuItem(
                          child: Text("Nutella"),
                          value: 5
                      )
                    ],
                    onChanged: (value) {
                      setState(() {
                        _value = value;
                      });
                    }
                  ) 
                ),
                Padding(
                  padding: EdgeInsets.all(10), 
                  child: Text('Observacoes')
                ),
                Padding(
                  padding: EdgeInsets.all(10), 
                  child: TextField(
                    controller: _obsInputController,
                    keyboardType: TextInputType.multiline,
                    minLines: 1,//Normal textInputField will be displayed
                    maxLines: 5,// when user presses enter it will adapt to it
                  )
                )
          ],
        ),
      
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Modular.to.pop(),
        child: Icon(Icons.save, color: Theme.of(context).floatingActionButtonTheme.foregroundColor,),
        foregroundColor: Theme.of(context).floatingActionButtonTheme.foregroundColor,
      ),
    );
  }
}
