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
    - [2.4 Spielregeln "On Fire"](#24-spielregeln--on-fire-)
- [3 Projektplanung](#3-projektplanung)
    - [3.1 Meilenstein 1](#31-meilenstein-1)
    - [3.2 Meilenstein 2](#32-meilenstein-2)
    - [3.3 Meilenstein 3](#33-meilenstein-3)
    - [3.4 Meilenstein 4](#34-meilenstein-4)
- [4 Anforderungen](#4-anforderungen)
    - [4.1 Funktionale Anforderungen](#41-funktionale-anforderungen)
        - [4.1.1 Registration](#411-uc-1---registration)
        - [4.1.2 Login](#412-uc-2---login)
        - [4.1.3 Spielregeln](#413-uc-3---spielregeln)
        - [4.1.4 Allgemeine Lobby](#414-uc-4---allgemeine-lobby)
        - [4.1.5 Nutzende zu Freundesliste hinzufügen](#415-uc-5---nutzende-zu-freundesliste-hinzufügen)
        - [4.1.6 Nutzende von Freundesliste entfernen](#416-uc-6---nutzende-von-freundesliste-entfernen)
        - [4.1.7 Freunde-Lobby](#417-uc-7---freunde-lobby)
        - [4.1.8 Spieltisch](#418-uc-8---spieltisch)
        - [4.1.9 Chatting](#419-uc-9---chatting)
        - [4.1.10 Normales Spiel](#4110-uc-10---normales-spiel)
        - [4.1.11 Spiel "On Fire"](#4111-uc-11---spiel--on-fire-)
        - [4.1.12 Schnellinterventionen](#4112-uc-12---schnellinterventionen)
        - [4.1.13 Spielstatistiken](#4113-uc-13---spielstatistiken)
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

Das folgende Dokument enthält die Dokumentation der Semesterarbeit im Modul WebE (Web Engineering), des
Frühlingssemesters 2023 an der Fernfachhochschule Schweiz (nachfolgend FFHS). Im Kern geht es dabei um die Umsetzung
einer web-basierten Applikation (fortan Web-App).

## 2 Erklärung des Spiels

Die Web-App wird ein Kartenspiel und ist die Umsetzung des bekannten Kartenspiels **"The Game - Spiel solange du
kannst..."**. Die Spielregeln und der Spielaufbau ergeben sich somit direkt aus jenen
des [realen Kartenspiels](https://www.gamefactory-spiele.com/the-game).

Informationen zum Spiel:

|                |                                     |
|----------------|-------------------------------------|
| Alter          | 8+ Jahre                            |
| Anzahl Spieler | 1 - 5                               |
| Dauer          | 20+ Minuten                         |
| Karten         | 98 Zahlenkarten, Werte von 2 bis 99 |

### 2.1 Spielaufbau

Zu Beginn gibt es vier Einzelkarten (Zielkarten) die auf der Spielfläche liegen und vier Ablegestapel anzeigen. Von den
98 Zahlenkarten erhält jede:r Spieler:in eine gewisse Anzahl verdeckt ausgeteilt. Die Anzahl Handkarten hängt von der
Anzahl Spielender ab (siehe folgende Tabelle). Die verbleibenden Zahlenkarten dienen verdeckt als Nachziehstapel.

| Anzahl Spielender | Anzahl Handkarten pro Spieler:in |
|-------------------|----------------------------------|
| 3, 4, 5           | 6                                |
| 2                 | 7                                |
| 1                 | 8                                |

### 2.2 Ziel des Spiels

Das Spiel basiert auf einem kollaborativen Ansatz. Alle Spieler:innen verfolgen also als Team das Ziel, das Spiel zu
besiegen. Dies ist geschafft, wenn sämtliche 98 Spielkarten auf die vier Ablegestapel abgelegt werden konnten.

### 2.3 Spielregeln

Die Spieler:innen versuchen reihum, ihre Karten auf die Ablegestapel abzulegen. Wichtig ist dabei, dass zwei Stapel
aufsteigend (2 - 100) und zwei Stapel absteigend (99 - 1) bedient werden müssen. Dabei muss die numerische Reihenfolge
der Werte respektiert werden (z.B., auf einem absteigenden Ablagestapel darf keine 55 auf eine 49 gelegt werden).
Solange auf dem Nachziehstapel noch Karten liegen, **müssen** alle Spieler:innen darüber hinaus in jeder Runde zwei
Karten ablegen. Sobald der Nachziehstapel keine Karten mehr enthält, **muss** in jeder Spieler in jeder Runde nur noch
eine Karte ablegen. Jede:r Spieler:in füllt nach dem Ablegen die Handkarten wieder vom Nachziehstapel auf.

Mit dem **Rückwärtstrick** können Kartenstapel gerettet werden. Es ist erlaubt, eine Karte mit einer exakten Differenz
von 10 (nicht 20, 30, etc.), entgegen der Zählrichtung (auf- bzw. absteigend) eines Ablagestapels zu legen. Dadurch wird
der Wert des Stapels wieder um 10 erhöht, bzw. gesenkt und es können mehr Karten abgelegt werden.

### 2.4 Spielregeln "On Fire"

Nebst dem Basisspiel soll auch der Spielmodus "On Fire" spielbar sein. Die Spielkarten mit den Werten **22, 33, 44, 55,
66 und 77** werden speziell gekennzeichnet und mit der Regel versehen, dass sie **zwingend sofort (d.h. vom Spielenden,
oder von der:dem nächsten Spieler:in) überdeckt** werden müssen. Kann das nicht erfüllt werden, ist das Spiel sofort
verloren.

## 3 Projektplanung

### 3.1 Meilenstein 1

**Abgabe: 26.02.2023 (PVA2 - 1d), Nachbearbeitung: 10.03.2023 (PVA3 - 2d)**  
Fokus dieses Meilensteines ist eine möglichst granulare Planung des Endproduktes. Der Programmieraspekt steht hier noch
im Hintergrund. Es sollen sowohl Mockups erstellt und genaue Anforderungen definiert werden. Folgende Punkte sollen in
dem Projektdokument geschildert und in dem Repository in dem Ordner "docs" hinterlegt werden.

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

**Abgabe: 26.03.2023 (PVA4 - 1d), Nachbearbeitung: 07.04.2023 (PVA5 - 2d)**  
Das Frontend, die Einarbeitung des Feedbacks aus dem ersten Meilenstein sowie eine Ausarbeitung der
Kommunikationsstrategie bilden den Fokus dieser Abgabe. Bereits ausprogrammiert soll die Anmeldung durch den Client beim
Server sein, damit die Kommunikation für spätere Schritte bereits gegeben ist. Das Frontend soll, neben der Anmeldung,
bereits grob strukturiert sein, muss allerdings nicht vollständig sein.

- [ ] Erweiterung des Kommunikationsschemas (Protokollplanung)
- [ ] Anmeldung eines Clients beim Server
- [ ] Möglichkeit, Nachrichten vom Client an den Server zu schicken mit angemeldetem Benutzer
- [ ] Möglichkeit der Kommunikation unter den Clients
- [ ] Grundgerüst Frontend
- [ ] Grundgerüst des Servers

### 3.3 Meilenstein 3

**Abgabe: 23.04.2023 (PVA6 - 1d), Nachbearbeitung: 05.05.2023 (PVA7 - 2d)**  
In diesem Schritt werden sowohl Server- wie auch Client-Seite weiterentwickelt. Insbesondere über den State der
Applikation sollen die gemachten Gedanken implementiert und ausprogrammiert werden. Die Logik der Applikation oder des
Spiels soll bereits vollständig stehen und programmiert sein. Das Projekt soll also bereits bedienbar sein. Es wird noch
nicht erwartet, dass sämtliche Kontroll- und Speichermechanismen vollständig implementiert sind.

- [ ] Verwaltung des State auf dem Client und auf dem Server
- [ ] Bedienbare Version des Projektes
- [ ] Erweiterte Version des Servers
- [ ] Erweiterte Version des Clients

### 3.4 Meilenstein 4

**Abgabe: 21.05.2023 (PVA8 - 1d), Nachbearbeitung: 02.06.2023 (PVA9 - 2d)**  
Mit dem Stand dieses Meilensteins muss das Projekt in der nächsten Präsenzveranstaltung präsentiert werden.
Dementsprechend muss die Funktionalität so komplett wie möglich integriert und das Projekt vollständig sein. Nach der
Präsenzveranstaltung werden noch zwei Wochen zur Verfügung gestellt. Dieser Puffer sollte allerdings nicht für fehlende
Features, sondern für Bugfixes und finalisierende Politur des Projektes dienen.

- [ ] Feature-complete Version des Servers
- [ ] Feature-complete Version des Clients
- [ ] Kontrolle, ob alle Anforderungen realisiert wurden
- [ ] Auflistung, was noch Verbessert werden muss und/oder was noch nicht erledigt wurde

## 4 Anforderungen

Die Anforderungen an die Web-App ergeben sich aus der Aufgabenstellung im Modulplan der FFHS, den Spielregeln (
vgl. [Abschnitt 2](#2-erklärung-des-spiels)) von "The Game" und Ideen des Entwicklers, welche die Vorgaben ergänzen. In
einem ersten Schritt werden die Anforderungen prosaisch festgehalten, bevor sie in einem weiteren Schritt aggregiert, in
funktionale und nicht-funktionale Anforderungen aufgebrochen und die funktionalen Anforderungen in entsprechende
Diagramme eingegliedert werden.

**Anforderungen der Aufgabenstellung:**

- NF, muss: Die Web-App muss über ein responsives Frontend verfügen.
- NF, muss: Aktions-Logik muss über ein Backend geregelt werden.
- NF, muss: Das Backend muss einen Persistenz-Layer aufweisen (Nachvollziehbarkeit von Spielrunden, Highscores,
  Account-Daten, Freundesliste).
- NF, muss: Die Web-App enthält eine Echtzeit-Chatfunktion, die mit Websockets umgesetzt ist.
- NF, muss: Der Datenaustausch zwischen Backend und Frontend wird über ein Kommunikationsprotokoll abgehalten.

**Anforderungen aus den Spielregeln:**

- F, muss: Die Web-App muss Spielsessions von 1 bis 5 Spieler:innen zulassen.
- F, muss: Die Web-App muss Nachziehstapel und Handkarten abbilden.
- F, muss: Die Web-App muss Ablagestapel (2x aufsteigend, 2x absteigend) abbilden.
- F, muss: Die Web-App muss die Logik des aufsteigenden und absteigenden Ablegens, sowie den Rückwärtstrick beherrschen.
- F, soll: Die Web-App muss Kurzinterventionen (Stapel blockieren, Stapel retten, etc.) zulassen.
- FN, muss: Die Web-App muss Kommunikation zwischen den Spieler:innen zulassen, ohne den Spielfluss zu stark zu
  beeinträchtigen.
- F, soll: Die Web-App muss die Spezialregeln des "On Fire" Modus umsetzen.
- F, muss: Die Web-App muss verstehen, wann das Spiel gewonnen ist bzw. nicht mehr gewonnen werden kann.

**Anforderungen des Entwicklers:**

- F, soll: Die Web-App soll eine öffentliche und eine Freunde-Lobby beinhalten.
- F, muss: Die Web-App muss das Erstellen von Spieltischen pro Modus erlauben.
- NF, soll: Die Web-App soll einen tisch-unabhängigen Light- und Dark-Mode unterstützen.
- NF, muss: Die Web-App muss in Deutsch und Englisch verfügbar sein.
- F, muss: Die Web-App muss ein Spieler:innen-Profil mit einer Score-History und Freunden erfassen können.

### 4.1 Funktionale Anforderungen

#### 4.1.1 UC #1 - Registration

<table>
  <tr>
    <th>Name</th>
    <td>UC #1 - Registration</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Die Spielenden registrieren sich als Nutzende der Applikation.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Nutzende sind nicht bereits registrierte Spielende.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Nutzende klicken auf die "Registrieren"-Oberfläche.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>Nutzende erhalten eine Erfolgsmeldung im UI.</td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>
      2a. Fehlende Felder werden gekennzeichnet, Formular wird nicht abgeschlossen
      3a. Invalide Felder werden gekennzeichnet, Formular wird nicht abgeschlossen 
    </td>
  </tr>
  <tr>
    <th>Normalfall</th>
      <td>
        1. Nutzende werden auf die "Registrieren"-Page weitergeleitet <br>
        2. Nutzende geben ihre persönlichen Daten an <br>
        3. Die Daten werden validiert <br>
        4. Für die nutzende Person wird ein Spieler:innen-Profil angelegt <br>
      </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>
      2a. Nutzende haben nicht alle Daten angegeben <br>
      3a. Die persönlichen Daten der Nutzenden werden als invalide erkannt.
    </td>
  </tr>
</table>

#### 4.1.2 UC #2 - Login

<table>
  <tr>
    <th>Name</th>
    <td>UC #2 - Login</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Registrierte Nutzende können sich einloggen.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Registrierte Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Nutzende haben durch eine Registration bereits ein Profil erhalten.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Nutzende klicken auf die "Login"-Oberfläche.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>
      Nutzende erhalten eine Erfolgsnachricht, werden eingeloggt und haben nun Zugang zu ihrem
      Profil, sowie zu allen Funktionen des Spiels.
    </td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>
      2a. Fehlende Felder werden gekennzeichnet, Formular wird nicht abgeschlossen
      4a. Generische Fehlernachricht wird angezeigt 
    </td>
  </tr>
  <tr>
    <th>Normalfall</th>
      <td>
        1. Ein "Login"-Dropdown wird angezeigt <br>
        2. Nutzende geben ihre Authentifikations-Daten (Username, Passwort) an <br>
        3. Nutzende klicken auf "Login"-Knopf <br>
        4. Authentifikations-Daten werden verifiziert <br>
        5. Nutzende werden eingeloggt <br>
      </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>
      2a. Nutzende füllen nicht alle Felder aus <br>
      4a. Authentifikations-Daten werden als invalide erkannt <br>
    </td>
  </tr>
</table>

#### 4.1.3 UC #3 - Spielregeln

<table>
  <tr>
    <th>Name</th>
    <td>UC #3 - Spielregeln</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Alle Nutzenden (nicht angemeldet, angemeldet) können die Regeln des Spiels einsehen</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Keine</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Nutzende klicken auf die "Spielregeln" Schaltfläche.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>Keine</td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>Keine</td>
  </tr>
  <tr>
    <th>Normalfall</th>
    <td>
      1. Spielregeln werden angezeigt <br>
      2. Nutzende lesen Spielregeln <br>
      3. Nutzende verlassen die Spielregeln-Übersicht wieder <br>
    </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>Keine</td>
  </tr>
</table>

#### 4.1.4 UC #4 - Allgemeine Lobby

<table>
  <tr>
    <th>Name</th>
    <td>UC #4 - Allgemeine Lobby</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Angemeldete Nutzende befinden sich in einer Lobby mit potenziellen Mitspieler:innen auf demselben Server.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Angemeldete Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>
      1. Nutzende sind angemeldet <br>
      2. Nutzende befinden sich auf der "Home"-Ansicht des Spiels <br>
      3. Nutzende haben keinen Filter der Übersicht aktiviert <br>
    </td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Keines</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>
      Nutzende erhalten eine Übersicht aller weiteren Nutzenden, die beim Server angemeldet sind.
    </td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>
      Eine Meldung über fehlende Mitspieler wird angezeigt und es können nur Einzeltische direkt gestartet werden.
    </td>
  </tr>
  <tr>
    <th>Normalfall</th>
      <td>
        1. Es sind Nutzende beim selben Server angemeldet.
      </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>
        1a. Es sind keine Nutzenden beim Server angemeldet.
    </td>
  </tr>
</table>

#### 4.1.5 UC #5 - Nutzende zu Freundesliste hinzufügen

<table>
  <tr>
    <th>Name</th>
    <td>UC #5 - Nutzende zu Freundesliste hinzufügen</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Nutzende können sich gegenseitig in Freundeslisten verwalten.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Sender:in (Nutzende:r), Empfänger:in (Nutzende:r)</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Akteure sind angemeldet.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Sender:in will Empfänger:in zur Freundesliste hinzufügen.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>Sender:in und Empfänger:in werden zur gegenseitigen Freundesliste hinzugefügt.</td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>
        3a. Empfänger:in erhält keine Anfrage <br>
        4a. Empfänger:in erhält Anfrage beim nächsten Login <br>
        5a. Empfänger:in wird nicht zur Freundesliste hinzugefügt <br>
    </td>
  </tr>
  <tr>
    <th>Normalfall</th>
      <td>
        1. Sender:in wählt Empfänger:in aus der Liste der Nutzenden aus <br>
        2. Sender:in klickt die "Zur Freundesliste einladen"-Oberfläche <br>
        3. Sender:in bestätigt im folgenden Pop-Up die Anfrage <br>
        4. Anfrage wird an den:die Empfänger:in geschickt <br>
        5. Empfänger:in bestätigt Anfrage <br>
      </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>
        3a. Sender:in bricht die Aktion im Pop-Up ab <br>
        4a. Empfänger:in geht Offline <br>
        5a. Empfänger:in lehnt Anfrage ab <br>
        5b. Sender:in erhält die Information über die Ablehnung <br>
    </td>
  </tr>
</table>

#### 4.1.6 UC #6 - Nutzende von Freundesliste entfernen

<table>
  <tr>
    <th>Name</th>
    <td>UC #6 - Nutzende von Freundesliste entfernen</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Nutzende können sich aus Freundeslisten entfernen.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Akteure sind angemeldet.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Nutzende:r will sich aus einer Freundesliste entfernen.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>
        Nutzer:in und Gegenüber wurden aus der jeweils anderen Freundesliste entfernt.
    </td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>
        Freundeslisten verbleiben unverändert. Keine Nachricht an Gegenüber.
    </td>
  </tr>
  <tr>
    <th>Normalfall</th>
      <td>
        1. Nutzende:r sucht die entsprechende Person in der eigenen Freundesliste <br>
        2. Nutzende:r klickt die "Aus Freundesliste entfernen"-Oberfläche <br>
        3. Nutzende:r bestätigt im Pop-Up die Aktion <br>
        4. Gegenseite erhält die entsprechende Information <br>
      </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>
        3a. Nutzende:r bricht die Aktion ab.
    </td>
  </tr>
</table>

#### 4.1.7 UC #7 - Freunde Lobby

<table>
  <tr>
    <th>Name</th>
    <td>UC #7 - Freunde Lobby</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Nutzende von der Freundesliste sind in einer eigenen Lobby einsehbar.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Nutzende sind eingeloggt.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Nutzende wollen "The Game" spielen.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>
        Die Übersicht zeigt alle eingeloggten Nutzenden, die auch auf der Freundesliste sind. <br>
    </td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>
        Der:die Nutzende erhält eine entsprechende Nachricht in der leeren Übersicht. <br>
    </td>
  </tr>
  <tr>
    <th>Normalfall</th>
    <td>
        1. Angemeldete Nutzende sehen eine Übersicht eingeloggten Nutzenden auf der Freundesliste <br>
    </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>
        1a.1. Keine Nutzenden auf der Freundesliste sind angemeldet. <br>
        1a.2. Die Freundesliste ist leer.
    </td>
  </tr>
</table>

#### 4.1.8 UC #8 - Spieltisch

<table>
  <tr>
    <th>Name</th>
    <td>UC #8 - Spieltisch</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Nutzende können Spieltische für eine bestimmte Anzahl Mitspielender und einen der beiden Modi kreieren.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Nutzende sind angemeldet.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Nutzende wollen eine Runde "The Game" spielen.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>
        Tisch mit der entsprechenden Konfiguration wurde erstellt.
    </td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>Keine.</td>
  </tr>
  <tr>
    <th>Normalfall</th>
    <td>
        1. Nutzende klicken die "Tisch erstellen"-Oberfläche <br>
        2. Nutzende geben die Anzahl Spielender an (1-5) <br>
        3. Nutzende geben den Spielmodus an (Classic/ On Fire) <br>
        4. Nutzende geben Einschränkungen an (offen/ nur Freundesliste) <br>
        5. Nutzende klicken "Fertigstellen" <br>
    </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>Keiner.</td>
  </tr>
</table>

#### 4.1.9 UC #9 - Chatting

<table>
  <tr>
    <th>Name</th>
    <td>UC #9 - Chatting</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Nutzende können sich über eine Chatfunktion in verschiedenen Modi austauschen.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Nutzende sind angemeldet.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Nutzende wollen sich mit anderen Nutzenden austauschen.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>
        Empfänger:innen erhalten die Nachricht.
    </td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>
        2a. Empfänger:in erhält Nachricht beim nächsten Login <br>
        3a. "Senden"-Knopf kann nicht geklickt werden.
    </td>
  </tr>
  <tr>
    <th>Normalfall</th>
    <td>
        1. Nutzende wählen im Chat-Fenster den gewünschten Pool (Flüstern, Freunde, gesamte Lobby) <br>
        2. (Falls Flüstern) Nutzende taggen eine:n andere:n eingeloggte:n Nutzende:n <br>
        3. Nutzende verfassen eine Nachricht und versenden diese <br>
    </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>
        2a. Empfänger:in loggt sich aus <br>
        3a. Nutzende verfassen keine Nachricht
    </td>
  </tr>
</table>

#### 4.1.10 UC #10 - Normales Spiel

<table>
  <tr>
    <th>Name</th>
    <td>UC #10 - Normales Spiel</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Nutzende können das Spiel im klassischen Modus spielen.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Nutzende wollen eine Spielrunde im klassischen Modus spielen.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Nutzende erstellen einen Tisch für den klassischen Spielmodus</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>
        Es gibt im Spiel keine Spezialkarten und Regeln.
    </td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>Keine.</td>
  </tr>
  <tr>
    <th>Normalfall</th>
    <td>
        1. An einem Tisch im klassischen Modus wird ein Spiel gestartet <br>
        2. Das Spiel kann entsprechend der Regeln im klassischen Modus gespielt werden <br>
    </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>Keiner.</td>
  </tr>
</table>

#### 4.1.11 UC #11 - Spiel "On Fire"

<table>
  <tr>
    <th>Name</th>
    <td>UC #11 - Spiel "On Fire"</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Nutzende können das Spiel im "On Fire" Modus spielen.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Nutzende wollen eine Spielrunde im "On Fire"-Modus spielen.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Nutzende erstellen einen Tisch für den "On Fire"-Spielmodus.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>Das Spiel wird analog der Regeln des "On Fire" Modus gespielt.</td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>Keine.</td>
  </tr>
  <tr>
    <th>Normalfall</th>
      <td>
        1. An einem Tisch im "On Fire"-Modus wird ein Spiel gestartet <br>
        2. Das Spiel kann entsprechend der Regeln im "On Fire"-Modus gespielt werden <br>
      </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>Keiner.</td>
  </tr>
</table>

#### 4.1.12 UC #12 - Schnellinterventionen

<table>
  <tr>
    <th>Name</th>
    <td>UC #12 - Schnellinterventionen</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Die Kommunikation während des Spiels kann durch Schnellinterventionen verbessert werden.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Ein Spiel wurde gestartet.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Akteure möchten bestimmte Aktionen schnell kommunizieren.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>
        Beim betroffenen Stapel wird die Aktion angezeigt, die ein anderer Nutzer geklickt hat.
    </td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>Keine.</td>
  </tr>
  <tr>
    <th>Normalfall</th>
      <td>
        1. Nutzende stellen fest, dass ein Rückwärtstrick möglich wäre, oder dass sie Karten in der Nähe eines Stapels auf der Hand haben <br>
        2. Nutzende klicken beim entsprechenden Stapel auf die Oberfläche um die Information schnell anzubringen <br>
      </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>Keiner.</td>
  </tr>
</table>

#### 4.1.13 UC #13 - Spielstatistiken

<table>
  <tr>
    <th>Name</th>
    <td>UC #13 - Spielstatistiken</td>
  </tr>
  <tr>
    <th>Ziel</th>
    <td>Nutzende können bestimmte Metriken in ihren Profilen tracken.</td>
  </tr>
  <tr>
    <th>Akteure</th>
    <td>Nutzende</td>
  </tr>
  <tr>
    <th>Vorbedingung</th>
    <td>Nutzende haben ein Profil und sind angemeldet.</td>
  </tr>
  <tr>
    <th>Auslösendes Ereignis</th>
    <td>Nutzende wollen Statistiken über ihre Spiele sehen.</td>
  </tr>
  <tr>
    <th>Nachbedingung Normalfall</th>
    <td>
        Nutzende sehen Metriken wie die Anzahl gespielter Spiele, die Anzahl gewonnener Spiele, die durchschnittliche Dauer eines Spiels.
    </td>
  </tr>
  <tr>
    <th>Nachbedingung Sonderfall</th>
    <td>
        Nutzende werden auf den Umstand der fehlenden Statistiken hingewiesen.
    </td>
  </tr>
  <tr>
    <th>Normalfall</th>
      <td>
        1. Nutzende klicken auf das "Profil"-Icon
        2. Nutzende wechseln auf die "Statistiken"-Ansicht
      </td>
  </tr>
  <tr>
    <th>Sonderfall</th>
    <td>
        2a. Es sind keine Spielstatistiken vorhanden (z.B. keine Spiele gespielt)
    </td>
  </tr>
</table>

### 4.2 Nicht-Funktionale Anforderungen

## 5 Eingesetzte Technologien

## 6 Datenmodell

## 7 UI Prototyp

### 7.1 Mobil

### 7.2 Desktop

## 8 Architekturentscheidungen

### 8.1 Kommunikationsprotokoll

## 9 Deploymentkonzept

## 10 Installationsanleitung

## 11 Projekt-Tagebuch

## Quellen