// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'container_controller.dart';

// **************************************************************************
// InjectionGenerator
// **************************************************************************

final $ContainerController = BindInject(
  (i) => ContainerController(),
  singleton: true,
  lazy: true,
);

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$ContainerController on _ContainerControllerBase, Store {
  final _$currentindexAtom =
      Atom(name: '_ContainerControllerBase.currentindex');

  @override
  int get currentindex {
    _$currentindexAtom.reportRead();
    return super.currentindex;
  }

  @override
  set currentindex(int value) {
    _$currentindexAtom.reportWrite(value, super.currentindex, () {
      super.currentindex = value;
    });
  }

  final _$menuOpenedAtom = Atom(name: '_ContainerControllerBase.menuOpened');

  @override
  bool get menuOpened {
    _$menuOpenedAtom.reportRead();
    return super.menuOpened;
  }

  @override
  set menuOpened(bool value) {
    _$menuOpenedAtom.reportWrite(value, super.menuOpened, () {
      super.menuOpened = value;
    });
  }

  final _$_ContainerControllerBaseActionController =
      ActionController(name: '_ContainerControllerBase');

  @override
  void toggleMenu() {
    final _$actionInfo = _$_ContainerControllerBaseActionController.startAction(
        name: '_ContainerControllerBase.toggleMenu');
    try {
      return super.toggleMenu();
    } finally {
      _$_ContainerControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
currentindex: ${currentindex},
menuOpened: ${menuOpened}
    ''';
  }
}
