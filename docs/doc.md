# Dokumentation: The Game
FS 2023, Web Engineering, Fabian Diemand  
Dozent: Ilir Fetai  
Repository: https://git.ffhs.ch/fabian.diemand/webe_the_game/  

---

## Inhalt
- [1 Einleitung](#1-einleitung)
- [2 Erklärung des Spiels](#2-erklärung-des-spiels)
  - [2.1 Spielaufbau](#21-spielaufbau)
  - [2.2 Ziel des Spiels](#22-ziel-des-spiels)
  - [2.3 Spielregeln](#23-spielregeln)
  - [2.4 Spielregeln "On Fire"](#24-spielregeln-on-fire)
- [3 Projektplanung](#3-projektplanung)
  - [3.1 Meilenstein 1](#31-meilenstein-1)
  - [3.2 Meilenstein 2](#32-meilenstein-2)
  - [3.3 Meilenstein 3](#33-meilenstein-3)
  - [3.4 Meilenstein 4](#34-meilenstein-4)
- [4 Anforderungen](#4-anforderungen)
  - [4.1 Funktionale Anforderungen](#41-funktionale-anforderungen)
  - [4.2 Nicht-Funktionale Anforderungen](#42-nicht-funktionale-anforderungen)
- [5 Eingesetzte Technologien](#5-eingesetzte-technologien)
- [6 Datenmodell](#6-datenmodell)
- [7 UI Prototyp](#7-ui-prototyp)
  - [7.1 Mobil](#71-mobil)
  - [7.2 Desktop](#72-desktop)
- [8 Architekturentscheidungen](#8-architekturentscheidungen)
- [9 Deploymentkonzept](#9-deploymentkonzept)
- [10 Installationsanleitung](#10-installationsanleitung)
- [11 Projekt-Tagebuch](#11-projekt-tagebuch)
- [Quellen](#quellen)

---

## 1 Einleitung
Das folgende Dokument enthält die Dokumentation der Semesterarbeit im Modul WebE (Web Engineering), des Frühlingssemesters 2023 an der Fernfachhochschule Schweiz (nachfolgend FFHS). Im Kern geht es dabei um die Umsetzung einer web-basierten Applikation (fortan Web App).

## 2 Erklärung des Spiels
Die Web App wird ein Kartenspiel und ist die Umsetzung des bekannten Kartenspiels **"The Game - Spiel solange du kannst..."**. Die Spielregeln und der Spielabbau ergeben sich somit direkt aus jenen des [realen Kartenspiels](https://www.gamefactory-spiele.com/the-game). 

Informationen zum Spiel:

|                |             |
|----------------|-------------|
| Alter          | 8+ Jahre    |
| Anzahl Spieler | 1 - 5       |
| Dauer          | 20+ Minuten |
| Karten         | 98 Zahlenkarten, Werte von 2 bis 99 |

### 2.1 Spielaufbau
Zu beginn gibt es vier Einzelkarten (Zielkarten) die auf der Spielfläche liegen und vier Ablegestapel anzeigen. Von den 98 Zahlenkarten erhält jede:r Spieler:in eine gewisse Anzahl verdeckt ausgeteilt. Die Anzahl Handkarten hängt von der Anzahl Spielender ab (siehe folgende Tabelle). Die verbleibenden Zahlenkarten dienen verdeckt als Nachziehstapel.

| Anzahl Spielender | Anzahl Handkarten pro Spieler:in |
|-------------------|----------------------------------|
| 3, 4, 5           | 6                                |
| 2                 | 7                                |
| 1                 | 8                                |

### 2.2 Ziel des Spiels
Das Spiel basiert auf einem kollaborativen Ansatz. Alle Spieler:innen verfolgen also als Team das Ziel, das Spiel zu besiegen. Dies ist geschafft, wenn sämtliche 98 Spielkarten auf die vier Ablegestapel abgelegt werden konnten.

### 2.3 Spielregeln
Die Spieler:innen versuchen reihum, ihre Karten auf die Ablegestapelabzulegen. Wichtig ist dabei, dass zwei Stapel aufsteigend (2 - 100) und zwei Stapel absteigend (99 - 1) bedient werden müssen. Dabei muss die numerische Reihenfolge der Werte respektiert werden (z.B., auf einem absteigenden Ablagestapel darf keine 55 auf eine 49 gelegt werden). Solange auf dem Nachziehstapel noch Karten liegen, **müssen** alle Spieler:innen darüber hinaus in jeder Runde zwei Karten ablegen. Sobald der Nachziehstapel keine Karten mehr enthält, **muss** in jeder Spieler in jeder Runde nur noch eine Karte ablegen. Jede:r Spieler:in füllt nach dem Ablegen die Handkarten wieder vom Nachziehstapel auf.  
  
Mit dem **Rückwärtstrick** können Kartenstapel gerettet werden. Es ist erlaubt, eine Karte mit einer exakten Differenz von 10 (nicht 20, 30, etc.), entgegen der Zählrichtung (auf- bzw. absteigend) eines Ablagestapels zu legen. Dadurch wird der Wert des Stapels wieder um 10 erhöht, bzw. gesenkt und es können mehr Karten abgelegt werden.

### 2.4 Spielregeln "On Fire"
Nebst dem Basisspiel soll auch der Spielmodus "On Fire" spielbar sein. Die Spielkarten mit den Werten **22, 33, 44, 55, 66 und 77** werden speziell gekennzeichnet und mit der Regel versehen, dass sie **zwingend sofort (d.h. vom Spielenden, oder von der:dem nächsten Spieler:in) überdeckt** werden müssen. Kann das nicht erfüllt werden, ist das Spiel sofort verloren.

## 3 Projektplanung
### 3.1 Meilenstein 1  
**Abgabe: 20.02.2023 (PVA2 - 1w), Nachbearbeitung: 10.03.2023 (PVA3 - 2d)**  
Fokus dieses Meilensteines ist eine möglichst granulare Planung des Endproduktes. Der Programmieraspekt steht hier noch im Hintergrund. Es sollen sowohl Mockups erstellt und genaue Anforderungen definiert werden. Folgende Punkte sollen in dem Projektdokument geschildert und in dem Repository in dem Ordner "docs" hinterlegt werden.

- [X] Beschreibung des Ziels des Spieles und der zugehörigen Spielregeln.
- [ ] Beschreibung der Anforderungen (Funktional, Nicht-Funktional, KANN, MUSS).
- [ ] Präsentation der Anforderungen an die zu entwickelnde Software
- [ ] Mockups für das Frontend, sowohl für Desktop als auch für Mobile Devices
- [ ] Erste Auflistung der verwendeten Technologien und Bibliotheken
- [ ] Kurze Beschreibung des Protokolls zwischen Client und Server
  - Welche Daten werden übertragen
  - Welchem Zweck dient der Austausch
  - Welcher Transportweg wird gewählt (WebSocket oder AJAX)   
- [ ] Arbeitsplan/Balkendiagramm

### 3.2 Meilenstein 2
**Abgabe: 20.03.2023 (PVA4 - 1w), Nachbearbeitung: 07.04.2023 (PVA5 - 2d)**  
Das Frontend, die Einarbeitung des Feedbacks aus dem ersten Meilenstein sowie eine Ausarbeitung der Kommunikationsstrategie bilden den Fokus dieser Abgabe. Bereits ausprogrammiert soll die Anmeldung durch den Client beim Server sein, damit die Kommunikation für spätere Schritte bereits gegeben ist. Das Frontend soll, neben der Anmeldung, bereits grob strukturiert sein, muss allerdings nicht vollständig sein.

- [ ] Erweiterung des Kommunikationsschemas (Protokollplanung)
- [ ] Anmeldung eines Clients beim Server
- [ ] Möglichkeit, Nachrichten vom Client an den Server zu schicken mit angemeldetem Benutzer
- [ ] Möglichkeit der Kommunikation unter den Clients
- [ ] Grundgerüst Frontend
- [ ] Grundgerüst des Servers
- [ ] Projekttagebuch

### 3.3 Meilenstein 3
**Abgabe: 17.04.2023 (PVA6 - 1w), Nachbearbeitung: 05.05.2023 (PVA7 - 2d)**  
In diesem Schritt werden sowohl Server- wie auch Client-Seite weiterentwickelt. Insbesondere über den State der Applikation sollen die gemachten Gedanken implementiert und ausprogrammiert werden. Die Logik der Applikation oder des Spiels soll bereits vollständig stehen und programmiert sein. Das Projekt soll also bereits bedienbar sein. Es wird noch nicht erwartet, dass sämtliche Kontroll- und Speichermechanismen vollständig implementiert sind.

- [ ] Verwaltung des State auf dem Client und auf dem Server
- [ ] Bedienbare Version des Projektes
- [ ] Erweiterte Version des Servers
- [ ] Erweiterte Version des Clients
- [ ] Projekttagebuch (klare Differenzierung zwischen Zustand im MS2 und MS3!)

### 3.4 Meilenstein 4
**Abgabe: 15.05.2023 (PVA8 - 1w), Nachbearbeitung: 02.06.2023 (PVA9 - 2d)**  
Mit dem Stand dieses Meilensteins muss das Projekt in der nächsten Präsenzveranstaltung präsentiert werden. Dementsprechend  muss die Funktionalität so komplett wie möglich integriert und das Projekt vollständig sein. Nach der Präsenzveranstaltung werden noch zwei Wochen zur Verfügung gestellt. Dieser Puffer sollte allerdings nicht für fehlende Features, sondern für Bugfixes und finalisierende Politur des Projektes dienen.

- [ ] Feature-complete Version des Servers
- [ ] Feature-complete Version des Clients
- [ ] Kontrolle, ob alle Anforderungen realisiert wurden
- [ ] Auflistung, was noch Verbessert werden muss und/oder was noch nicht erledigt wurde
- [ ] Projekttagebuch (klare Differenzierung zwischen Zustand im MS3 und MS4!)

## 4 Anforderungen

### 4.1 Funktionale Anforderungen
### 4.2 Nicht-Funktionale Anforderungen

## 5 Eingesetzte Technologien

## 6 Datenmodell

## 7 UI Prototyp

### 7.1 Mobil
### 7.2 Desktop

## 8 Architekturentscheidungen

## 9 Deploymentkonzept

## 10 Installationsanleitung

## 11 Projekt-Tagebuch

## Quellen